import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getArtwork } from "@/lib/artworks";

// Prices in artworks.ts are plain numbers in this currency. Change here if
// you'd rather sell in EUR/PLN, no other code needs to change.
const CURRENCY = "usd";

const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection["allowed_countries"] =
  ["US", "CA", "GB", "PL", "DE", "FR", "IT", "ES", "NL", "IE", "AU", "SE", "NO", "DK", "AT", "BE", "CH"];

type CheckoutBody = {
  slug: string;
  type: "print" | "original";
  label?: string;
  framed: boolean;
};

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Payments aren't connected yet." },
      { status: 501 }
    );
  }

  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const artwork = getArtwork(body.slug);
  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found." }, { status: 404 });
  }

  let unitAmount: number;
  let name: string;

  if (body.type === "original") {
    if (!artwork.original.available || !artwork.original.price) {
      return NextResponse.json(
        { error: "This original is not available." },
        { status: 400 }
      );
    }
    unitAmount = artwork.original.price;
    name = `${artwork.title}: Original painting`;
  } else {
    const print = artwork.prints.find((p) => p.label === body.label);
    if (!print) {
      return NextResponse.json({ error: "Print size not found." }, { status: 400 });
    }
    unitAmount = print.price;
    name = `${artwork.title}: Print (${print.label}, ${print.dimensions})`;
  }

  if (body.framed) {
    unitAmount += artwork.framingPrice;
    name += " + framing";
  }

  const origin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name,
              images: [`${origin}${artwork.image}`],
            },
            unit_amount: Math.round(unitAmount * 100),
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
      success_url: `${origin}/shop/${artwork.slug}?checkout=success`,
      cancel_url: `${origin}/shop/${artwork.slug}?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 }
    );
  }
}

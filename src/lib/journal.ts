export type JournalLocale = "en" | "pl";

import { darkProphecy, prophecy } from "./journalChapter";

export type JournalEntry = {
  slug: string;
  published?: boolean;
  date: string;
  readingTime: string;
  title: Record<JournalLocale, string>;
  subtitle: Record<JournalLocale, string>;
  excerpt: Record<JournalLocale, string>;
  tags: string[];
  images?: {
    src: string;
    alt: Record<JournalLocale, string>;
    afterParagraph?: number;
  }[];
  paragraphs: Record<JournalLocale, string[]>;
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "the-last-dawn-chapter-one",
    published: true,
    date: "2026-08-05",
    readingTime: "8 min",
    title: {
      en: "The Last Dawn  -  Chapter One",
      pl: "The Last Dawn  -  Rozdział pierwszy",
    },
    subtitle: {
      en: "The Dark Prophecy",
      pl: "Mroczna Przepowiednia",
    },
    excerpt: {
      en: "A rider follows a painting into a kingdom that should have disappeared decades ago. At the edge of the Misty Woods, a warm inn is still waiting  -  and somebody is playing a lute for the empty chairs.",
      pl: "Jeździec podąża za obrazem do królestwa, które powinno zniknąć dziesiątki lat temu. Na skraju Mglistego Lasu wciąż czeka ciepła gospoda  -  a ktoś gra na lutni dla pustych krzeseł.",
    },
    tags: [
      "dark fantasy",
      "fantasy fiction",
      "The Last Dawn",
      "soulslike atmosphere",
    ],
    images: [
      {
        src: "/images/journal/the-last-dawn-menu.png",
        afterParagraph: 0,
        alt: {
          en: "The Last Dawn game menu over a red fantasy landscape",
          pl: "Menu gry The Last Dawn na tle czerwonego fantastycznego krajobrazu",
        },
      },
      {
        src: "/images/journal/the-last-dawn-jester.png",
        afterParagraph: 25,
        alt: {
          en: "The Jester playing music on the balcony in The Last Dawn",
          pl: "Błazen grający muzykę na balkonie w The Last Dawn",
        },
      },
    ],
    paragraphs: {
      en: [
        "The Last Dawn shall mark the end of light. A night shall rise that knows no morning. Through pride and prejudice mankind shall fall, and from its ashes, a darker age begin.",
        "The sun was sinking behind the snowy peaks of the Shaded Mountains, its dying light casting long shadows across the pine-strewn hills above Castle Black. A cold wind swept through the trees, whispering through the silence like a ghost of days long lost. Mist curled up from the barren wastelands  -  once lush farmlands, now forsaken, claimed by the curse.",
        "Collapsed wooden houses lay scattered in the east, awaiting their masters' return, where once the hamlet of Rindlem had thrived. On a hill beyond the ruins rose a solitary tower of blackened brick, crowned with a spired roof. One window glowed with feeble light, casting a pale gleam into the gloom.",
        "From the shadows of the forest emerged a rider, cloaked in black. He stepped to the cliff's jagged edge and raised a rolled canvas. Upon it was the very same view: the tower in the mist, the sun retreating behind the castle  -  and a figure on horseback, turned towards the view.",
        "He first saw the painting in a chapel long lost to rot and rain. It was nailed to the stone wall, half-torn, its edges black with fire. But the scene was clear: a dark figure on a cliff, watching the mist rise over a broken land. Himself. No doubt. The same cloak. The same wound. That was decades ago. Since then, he had followed roads even ghosts had forgotten, chasing a place painted before he was born.",
        "The road was harsh and steep, overrun with roots and wild weeds. Once, this had been the main trade route of Alsnar, a kingdom famed for gleaming ores, golden crops, and timber from the elder woods. But now all was lost. The air echoed not with wagons or song, but with the hollow howl of wind and the restless sighs of forgotten souls. A rotted sign still hung from a leaning post, its letters faded but legible: To the Butchered Lamb.",
        "The sound of hooves echoed through the Misty Woods, a place so ancient that even the leaves had ceased to fall from the cursed boughs. Then, breaking the hush, came the murmur of a stream. The stars above stirred, and the wind sang once more. Rising over the hill through the veil of mist was a two-storey tavern, its silhouette carved from the timbers of the Ancient Woods, from an age when the ground was still strong and the sky still sang.",
        "The stables stood empty, and the walls were weary, but the structure held  -  as though memory alone kept it standing. Built against the cliffside, a balcony stretched over the gorge, still scattered with stools and tables where once laughter bloomed. But now all was still. All save one table. Beneath the pale breath of moonlight sat the Jester, telling stories to the empty chairs.",
        "Inside, warmth still lingered. It belonged to Breg, the innkeeper, a man large of frame and thick with beard, as much a part of the tavern as the beams above his head. He stood behind the bar polishing a glass, his eyes steady, as if time itself had never moved past him.",
        "The rider drank star-water from the polished glass. It was cool as mountain snowmelt, but beneath it carried a warmth, subtle and strange. With every swallow, strength returned to limbs worn thin by wind and weariness. For the first time in many days he felt the warmth of a hearth, the comfort of walls not yet taken by ruin, and the quiet miracle of being simply welcome.",
        "Later, when the fire dipped low, music drifted from the balcony. Soft, strange, tinged with sorrow. A lute's voice  -  golden, thin, trembling like a memory. The Jester sat upon the wooden rail as if the laws of balance did not concern him. His instrument gleamed like burnished gold, and its strings sang songs from castles long lost, from banquets buried beneath ash and snow.",
        "The Jester sang. His voice, lilting and cracked like dry parchment, wove a rhyme that might once have been merry, but now clung to sorrow like moss to stone. Each verse seemed older than the last, as though passed down not from bard to bard, but from dream to nightmare.",
        "The rider did not speak. He only listened  -  to the words, to the tone, to the madness cloaked in rhyme. There was truth here, buried in riddle and jest. The King had tried. And failed. And the price had been paid by the land, and by the Witch whose fire still lingered in ash.",
      ],
      pl: [
        "Ostatni Świt oznajmi kres światła. Noc powstanie, co brzasku nie zna. Z pychy i uprzedzeń ludzkość upadnie, a z jej popiołów narodzi się mroczniejsza era.",
        "Słońce chyliło się ku zachodowi za ośnieżonymi szczytami Cienistych Gór, a jego konające światło rzucało długie cienie na porośnięte sosnami wzgórza nad Czarnym Zamkiem. Chłodny wiatr przeszywał knieje, szepcząc przez milczenie niczym duch dni dawno utraconych. Mgła wiła się ku górze jałowych pustkowi  -  niegdyś żyznych pól, teraz opuszczonych i zabranych przez klątwę.",
        "Na wschodzie leżały zawalone drewniane chaty, oczekujące powrotu swoich panów, tam, gdzie niegdyś tętniła życiem osada Rindlem. Na wzgórzu za ruinami wznosiła się samotna wieża z poczerniałej cegły, uwieńczona ostrym dachem. Jedno okno tliło się nikłym światłem, rzucając bladą poświatę w mrok.",
        "Z mroku kniei wynurzył się ciemny jeździec. Podszedł do poszarpanego skraju urwiska i uniósł zwinięte płótno. Na nim widniał ten sam krajobraz: wieża tonąca we mgle, słońce ustępujące za murami zamczyska  -  i postać na koniu, zwrócona ku widokowi.",
        "Po raz pierwszy ujrzał ten obraz w kaplicy dawno oddanej na pastwę deszczu i zgnilizny. Był przybity do kamiennej ściany, nadpalony i poszarpany, z krawędziami sczerniałymi od ognia. A jednak scena pozostała wyraźna: ciemna sylwetka na urwisku, wpatrzona w mgły unoszące się nad spustoszoną krainą. On sam. Nie miał co do tego wątpliwości. Ten sam płaszcz. Ta sama rana. To było przed dekadami. Od tamtej chwili podążał ścieżkami, o których nawet duchy już nie pamiętały, ścigając miejsce namalowane, zanim przyszedł na świat.",
        "Droga była surowa i stroma, porośnięta dzikimi ziołami i oplątana korzeniami. Niegdyś był to główny trakt handlowy Alsnar, królestwa słynącego z połyskujących rud, złotych zbiorów i drewna z pradawnych lasów. Lecz wszystko to przepadło. Powietrze nie niosło już turkotu wozów ani pieśni kupców, lecz tylko puste wycie wiatru i niespokojne westchnienia zapomnianych dusz. Na przekrzywionym słupie wciąż wisiał spróchniały znak: Do Zarżniętej Owcy.",
        "Odgłos kopyt odbijał się echem w Mglistej Puszczy, miejscu tak dawnym i zapomnianym, że nawet liście przestały spadać z przeklętych konarów. Wtedy, przerywając martwą ciszę, dał się słyszeć szept strumienia. Gwiazdy poruszyły się ponad koronami, a wiatr znów zaśpiewał. Ponad wzgórzem, z mlecznej zasłony mgły, wyłonił się kształt: dwupiętrowa gospoda z drewna Pradawnego Lasu, z czasów, gdy ziemia była jeszcze mocna, a niebo śpiewało.",
        "Stajnie stały puste, a ściany zmęczone, lecz budowla wciąż trwała, jakby to sama pamięć trzymała ją w pionie. Przy urwisku rozciągał się balkon, wciąż usiany stołkami i stołami, gdzie niegdyś rozbrzmiewał śmiech. Lecz teraz wszystko milczało. Wszystko prócz jednego stołu. Tam, pod bladym tchnieniem księżyca, siedział Błazen, opowiadający historie pustym krzesłom.",
        "Ciepło gospody należało do Brega, karczmarza potężnej postury, tak zespolonego z budynkiem jak belki nad jego głową. Stał za ladą, polerując kufel, ze spojrzeniem tak pewnym, jakby czas nigdy nie odważył się go minąć. Zarżnięta Owca była dla niego czymś więcej niż domem  -  była jego sercem.",
        "Jeździec napił się Wody Gwiazd. Była chłodna jak topniejący śnieg, lecz pod powierzchnią kryło się ciepło, subtelne i dziwne. Z każdym łykiem wracały siły, które wiatr i znużenie odebrały mu dawno temu. Po raz pierwszy od wielu dni poczuł ciepło domowego ogniska, ukojenie ścian jeszcze nieskalanych ruiną i cichy cud bycia po prostu mile widzianym.",
        "Później, gdy ogień przygasł, z balkonu dobiegła muzyka. Cicha, dziwna, przesycona smutkiem. Głos lutni  -  złoty, kruchy i drżący jak wspomnienie. Błazen siedział na drewnianej poręczy, jakby prawa równowagi go nie dotyczyły. Jego instrument lśnił jak złoto w ogniu, a struny śpiewały pieśni z zamków dawno utraconych i bankietów pogrzebanych pod popiołem i śniegiem.",
        "Błazen zaśpiewał. Jego głos, falujący i popękany jak stare pergaminy, tkał rym, który może niegdyś był wesoły, lecz teraz przylgnął do smutku jak mech do kamienia. Każda zwrotka zdawała się starsza od poprzedniej, jakby przekazywano ją nie z barda na barda, lecz ze snu w koszmar.",
        "Jeździec nie odezwał się ani nie poruszył. Tylko słuchał  -  słów, tonu i szaleństwa ukrytego w rymie. Bo była w tym prawda, pogrzebana w zagadce i żarcie. Król próbował. I zawiódł. A cenę zapłaciła ziemia i Wiedźma, której ogień wciąż tlił się w popiele.",
      ],
    },
  },
  {
    slug: "children-of-the-sun-worldbuilding",
    published: false,
    date: "2026-08-06",
    readingTime: "10 min",
    title: { en: "Children of the Sun", pl: "Dzieci Słońca" },
    subtitle: {
      en: "Worldbuilding notes from Reviclades",
      pl: "Notatki ze świata Reviclades",
    },
    excerpt: {
      en: "The Children of the Sun began as a refuge for people who had nothing left. Over centuries, shelter became prophecy, prophecy became power, and the Black Phoenix began to look back at the world.",
      pl: "Dzieci Słońca zaczęły jako schronienie dla ludzi, którym nie pozostało już nic. Przez stulecia schronienie stało się proroctwem, proroctwo władzą, a Czarny Feniks zaczął spoglądać w stronę świata.",
    },
    tags: [
      "worldbuilding",
      "dark fantasy",
      "Reviclades",
      "Children of the Sun",
    ],
    images: [
      {
        src: "/images/journal/sand-shrine.png",
        alt: {
          en: "Church of the Sun concept sketch",
          pl: "Szkic Kościoła Słońca",
        },
      },
      {
        src: "/images/journal/the-first-eclipse.jpg",
        alt: {
          en: "The First Eclipse over a desert kingdom",
          pl: "Pierwsze Zaćmienie nad pustynnym królestwem",
        },
      },
      {
        src: "/images/journal/children-of-the-sun.png",
        alt: {
          en: "The Black Phoenix before the sun",
          pl: "Czarny Feniks na tle słońca",
        },
      },
      {
        src: "/images/journal/architect-quan.png",
        alt: {
          en: "Architect Quan with the Phoenix staff",
          pl: "Architekt Quan z laską Feniksa",
        },
      },
    ],
    paragraphs: {
      en: [
        "Words written therein are only for those who wish to seek the path of freedom from life. If the choice is made, thus the soul is ready for pilgrimage.",
        "The Black Sun shall mark the end of light. A night shall rise that knows no morning. Through pride and prejudice mankind shall fall, and from its ashes, a darker age begin. From The Coming of the Second Sun, Ancient Prophecy.",
        "The Children of the Sun emerged from weak mortals whose miserable lives left them no choice but to live in pain, or be free in the eternal darkness of death. It is said that the founder of the Cult was a wise king of an ancient kingdom, one that has long ago turned to dust or was changed beyond recognition.",
        "His rule was just and kind, but as the kingdom grew, so did the greed of its people. In the last days of his reign, advisors beset him. The Senate schemed against him, and corruption leaked from the castle keep. They wanted more power over laws, so more coins could flow through their fingers. Every new law that allowed slavery, reduced education, or controlled who could drink purified water was still missing the King's Seal.",
        "On the night of the Red Moon, when the King's eyes were fixed on the uncertain future of the kingdom, his only remaining trusted advisor told him that men would come to take his life. Then he was gone forever. Some say he turned to stone. Others say he shed his mortal skin and became a beast. History records only that he fell ill and died on his throne.",
        "What followed was years of famine, drought, and darkness, as if the earth itself anguished in pain. The gap between social classes widened. The rich became richer. The poor became poorer. Those without coin soon became slaves. Those who tried to escape were met with chains and spears. Soon people lost hope, brother turned against brother, and the illusion of safety in peaceful society was shattered.",
        "In the darkest day of the second era, a light emerged. Some saw a shadow in the dark, others a black bird in the sun. The Prophets of Eclipse were born with a saying: a kind man burned in the sun, his skin grew feathers, and he was born anew in the eclipse that followed.",
        "The weak were lured to the darkest places: cellars, dark caverns, and abandoned churches. There they gathered to pray for the Eclipse to cleanse the world of evil and pain. The Phoenix was their messiah. They believed the Black Phoenix would be born in the ashes of the First Eclipse, after the waking of the Second Sun that would shine eternally and burn the evil souls rich in Revium magic.",
        "At first the Children of the Sun were simply gatherings of people who sought help. The Cult offered food and shelter. There was music by the fire, counsel by the elders, and most importantly, love that was missing from everyday life. But when freedom became something reserved for the higher castes, people had nothing left to lose.",
        "With broken daggers they targeted their slave masters. Under the moon, blood was spilled and bodies were burned in the name of the Sun. One by one, the monarchs' power weakened. Under the closed eyes of kings, the Children of the Sun grew in power.",
        "The current leader, Quan, is believed to be the first person who saw the bird with no shadow beneath the sun. In a vision he saw a great desert filled with floating dunes and sandfalling islands, circling the turquoise oasis waters of life. There a Great Sphinx slept, able to answer any question in the known universe. To ask about the Second Sun, the Children would need enough power to subjugate him.",
        "Architect Quan was once a mage advisor to the kings. He possessed power unthinkable to mortal men. He could use Revium to subjugate the Sphinx, but he would have to sacrifice hundreds of lives to do so.",
        "The First Eclipse was planned as a festival. The Children would poison the purified waters of the oasis, put the people into a trance with frog music, replace the food with human flesh, and siphon the lives of the weak to bring the Eclipse.",
        "When the dark figure finally turned toward the Sphinx, the crowd could not respond. The Black Sun came through the clouds. As its light fell on human skin, life energy was pulled from bodies and people slowly turned to stone. A few remained in the ashes. The Black Sun disappeared, but the dark clouds and red sky remained. What happened next, nobody knows, except the Slave who emerged from the bones he once loved.",
      ],
      pl: [
        "Słowa tu zapisane są tylko dla tych, którzy chcą szukać drogi wyzwolenia od życia. Jeśli wybór zostanie dokonany, dusza jest gotowa na pielgrzymkę.",
        "Czarne Słońce oznajmi kres światła. Noc powstanie, co brzasku nie zna. Z pychy i uprzedzeń ludzkość upadnie, a z jej popiołów narodzi się mroczniejsza era. Z Nadejścia Drugiego Słońca, starożytnego proroctwa.",
        "Dzieci Słońca powstały ze słabych śmiertelników, których nędzne życie nie pozostawiało wyboru poza cierpieniem albo wolnością w wiecznej ciemności śmierci. Mówi się, że założycielem Kultu był mądry król starożytnego królestwa, które dawno obróciło się w pył albo zmieniło się nie do poznania.",
        "Jego rządy były sprawiedliwe i łagodne, lecz wraz ze wzrostem królestwa rosła chciwość ludzi. Pod koniec jego panowania doradcy zwrócili się przeciwko niemu. Senat spiskował, a korupcja sączyła się z zamkowej warowni. Chcieli większej władzy nad prawem, aby więcej monet przepływało przez ich palce. Każda ustawa pozwalająca na niewolnictwo, ograniczająca edukację albo decydująca o tym, kto może pić oczyszczoną wodę, wciąż nie miała Królewskiej Pieczęci.",
        "W noc Czerwonego Księżyca, gdy wzrok króla spoczywał na niepewnej przyszłości królestwa, jego ostatni zaufany doradca powiedział mu, że tej nocy przyjdą ludzie, by odebrać mu życie. Potem król zniknął na zawsze. Jedni mówią, że zamienił się w kamień. Inni, że zrzucił śmiertelną skórę i stał się bestią. Historia zapisała tylko, że zachorował i umarł na tronie.",
        "Nastały lata głodu, suszy i ciemności, jakby sama ziemia cierpiała. Przepaść między klasami rosła. Bogaci stawali się bogatsi, biedni biedniejsi, a ci bez monet w kieszeniach wkrótce stawali się niewolnikami. Ci, którzy próbowali uciekać, spotykali łańcuchy i włócznie. Ludzie tracili nadzieję, brat zwracał się przeciw bratu, a złudzenie bezpieczeństwa spokojnego społeczeństwa pękło.",
        "W najciemniejszym dniu drugiej ery pojawiło się światło. Jedni widzieli cień w mroku, inni czarnego ptaka na tle słońca. Narodzili się Prorocy Zaćmienia, powtarzający słowa: dobry człowiek spłonął w słońcu, jego skóra porosła piórami, a on narodził się na nowo w zaćmieniu, które nadeszło.",
        "Słabych przyciągały najciemniejsze miejsca: piwnice, jaskinie i opuszczone kościoły. Zbierali się tam, aby modlić się o Zaćmienie, które oczyści świat ze zła i bólu. Feniks był ich mesjaszem. Wierzyli, że Czarny Feniks narodzi się z popiołów Pierwszego Zaćmienia, po przebudzeniu Drugiego Słońca, które będzie świecić wiecznie i spali złe dusze bogate w magię Revium.",
        "Na początku Dzieci Słońca były po prostu zgromadzeniami ludzi szukających pomocy. Kult dawał jedzenie i schronienie. Przy ognisku była muzyka, rada starszych i, co najważniejsze, miłość, której brakowało w codziennym życiu. Lecz kiedy wolność stała się przywilejem wyższych kast, ludziom nie pozostało już nic do stracenia.",
        "Złamanymi sztyletami uderzali w swoich panów. Pod księżycem przelewano krew i palono ciała w imię Słońca. Władza monarchów słabła. Pod zamkniętymi oczami królów Dzieci Słońca rosły w siłę.",
        "Obecny przywódca, Quan, jest uważany za pierwszego człowieka, który zobaczył ptaka bez cienia pod słońcem. W wizji ujrzał wielką pustynię pełną spadających wysp piasku, krążących wokół turkusowych wód oazy życia. Tam spał Wielki Sfinks, mogący odpowiedzieć na każde pytanie znanego wszechświata. Aby zapytać o Drugie Słońce, Dzieci potrzebowały mocy, by go zniewolić.",
        "Architekt Quan był niegdyś magiem doradzającym królom. Posiadał moc niewyobrażalną dla śmiertelników. Mógł użyć Revium, aby podporządkować sobie Sfinksa, lecz musiałby poświęcić setki istnień.",
        "Pierwsze Zaćmienie zaplanowano jako święto. Dzieci miały zatruć oczyszczoną wodę oazy, wprowadzić ludzi w trans muzyką żab, podmienić jedzenie na ludzkie mięso i wysączyć życie ze słabych, aby sprowadzić Zaćmienie.",
        "Kiedy ciemna postać zwróciła się ku Sfinksowi, tłum nie był w stanie odpowiedzieć. Czarne Słońce wyszło zza chmur. Jego światło wyciągało energię z ciał ludzi, a oni powoli zamieniali się w kamień. Nieliczni pozostali w popiołach. Czarne Słońce zniknęło, lecz ciemne chmury i czerwone niebo pozostały. Co stało się później, nikt nie wie, poza Niewolnikiem, który wyłonił się z kości tych, których kiedyś kochał.",
      ],
    },
  },
  {
    slug: "the-first-stars-worldbuilding",
    published: false,
    date: "2026-08-07",
    readingTime: "12 min",
    title: { en: "Circle of the Moon", pl: "Krąg Księżyca" },
    subtitle: {
      en: "The Moon, the Gallery of Stars, and the Forest of Fallen Stars",
      pl: "Księżyc, Galeria Gwiazd i Las Upadłych Gwiazd",
    },
    excerpt: {
      en: "Fragments of the Moon fell on the outskirts of the Kingdom of the Makers. The Singing Stones taught the forest people to read the stars, until the Gallery of Stars turned knowledge into catastrophe.",
      pl: "Fragmenty Księżyca spadły na obrzeża Królestwa Twórców. Śpiewające Kamienie nauczyły leśny lud czytać gwiazdy, dopóki Galeria Gwiazd nie zamieniła wiedzy w katastrofę.",
    },
    tags: ["worldbuilding", "moon world", "Forest of Fallen Stars", "Ribbiton"],
    images: [
      {
        src: "/images/journal/circle-of-the-moon.jpg",
        alt: {
          en: "Quan disguised as Martin before the Circle of the Moon",
          pl: "Quan przebrany za Martina przed Kręgiem Księżyca",
        },
      },
      {
        src: "/images/journal/the-moon.jpg",
        alt: { en: "The Moon painting", pl: "Obraz Księżyc" },
      },
      {
        src: "/images/journal/forest-of-the-fallen-stars-map.png",
        alt: {
          en: "Map sketch of the Forest of the Fallen Stars",
          pl: "Szkic mapy Lasu Upadłych Gwiazd",
        },
      },
      {
        src: "/images/journal/akira.png",
        alt: {
          en: "Akira, the flute lady, playing in the forest",
          pl: "Akira, flecistka, grająca w lesie",
        },
      },
      {
        src: "/images/journal/ribbiton.png",
        alt: {
          en: "Ribbiton beside the forest pond",
          pl: "Ribbiton nad leśnym stawem",
        },
      },
    ],
    paragraphs: {
      en: [
        "In the ancient past, fragments of the Moon began falling on the outskirts of the ancient Kingdom of the Makers. They were called the Singing Stones, for they hummed with a faint sound that could grant listeners a glimpse of the greater whole.",
        "People gathered there to listen, and slowly they began to understand. The Stones taught the forest people how to read the stars, and the stars revealed the secret language of the leaves. In time they became one with nature. They learned truth from the bark of trees and wisdom from the breath of air. They came to know every star and every grain of sand in what would later be called the Forest of the Fallen Stars.",
        "But peace did not last forever. After the rise of the Elemental Wars, humans sought stronger weapons to defend themselves. They turned their eyes toward the powerful stones of the forest and asked the Forest Folk for permission to study them, building a research facility upon the ancient lake where most of the stars had fallen.",
        "Deep within the chambers of the Gallery of Stars, their search for knowledge turned to madness. They did not seek peace, but power. Soon their minds were consumed by greed. They demanded more stones, even the most sacred ones revered by the Circle of the Moon.",
        "And thus the genocide began. First the trees burned. Then the chieftains. The people of the forest fled into the shadows, and with the help of the Moon they found safety beneath the night.",
        "Deep within the lowest level of the Gallery, the Makers mixed fragments of the Earth Elemental God Tellus with fragments of the Moon. In defiance of nature they created the Stone of Knowing, an artifact that knew what was, what is, and what might yet come to be. The laws of the universe were revealed. The hidden fabric that held the world together could be bent, snapped, and rewritten by thought alone.",
        "With this power they built a contraption capable of killing the gods who warred against them. Atop the Starfell Mountains, an Observatory was built, a device that could manipulate the stars themselves.",
        "The stars intervened and gave the druids Ancient Powers. The forest folk gained the ability to shed their mortal skin and become beasts of fang and claw. They began hunting the mages. In moonlit rituals they tore them apart and sacrificed them upon the Altar of the Moon, siphoning their stolen power.",
        "Then came the Night of the Red Moon. The Maker, master of the Gallery of Stars, climbed to the summit of the Starfell Observatory. He used the Stone of Knowing to bend the heavens, forcing the stars to fall upon the Elements and strike down the kingdoms of his enemies.",
        "That day a catastrophe shattered the world. The earth cracked. Waters rose into towering tsunamis. Volcanoes awoke and raged across the land as the laws of nature were torn apart. Even the Sun burned all who stood upon the peak. It became known as the First Eclipse, and the burned shadows of the Makers still hunt Starfell Peak.",
        "The Stone itself was too powerful for the stars to destroy. A pact was made. It would be hidden within the Heart of Tellus, in the deepest chamber beneath the ancient Kingdom of Mages, behind doors that could only be seen and opened through the Mask of the Maker. The Mask was taken to the Gallery of Stars and buried with the Maker's remains. Then the Gallery was sunk beneath the lake with the aid of the Water Goddess Onda.",
        "Two thousand years later, peace slowly returned. Humans retreated to their cities, and the druids became one with the forest once more. Outsiders were no longer welcome among the trees. Some who entered never returned, for the druids had not forgotten what had been done to them.",
        "Quan, disguised as Martin, came to the chieftains and asked for the location of the Gallery of Stars. He spoke like an old friend of the forest and claimed that he wanted to uncover what had been hidden from history. The chieftains did not notice the charm he cast. Moses, the Shepherd, began to lead him toward the Ancient Lake.",
        "But the spell began to fade. When Moses realized who stood beside him, he charged. Quan was impaled against a tree, but not before he siphoned part of Moses' life force. When he awoke, the moose's body was sinking beneath the sacred earth, and the roots began to carry the blight.",
        "In the nearby pond live the Ribbits, a tribe of humanoid frogs. Cartographers of Lapis Arbor call the place Ribbiton, but to an ordinary frog it is simply the Pond. They have lived there since the beginning of time, evolving after the Calamity. Their village is full of rounded mud-brick huts, banjo music, loud ribbits, and the smell of roasted insects.",
        "For the Ribbits, sound is sacred. They believe the world was born from a single sound, a primordial note that traveled through the void and created waves. To honor this miracle, they make Bells of Remembrance from Moonstone pebbles. Every frog receives a bell with a sound that belongs only to them.",
        "Akira, the foxey lady in panther form, plays the flute on the outskirts of Ribbiton. She is the daughter of Ruboros and Gaya, and she struggles with the way of the forest while haunted by the ghost of her mother. Her music belongs to the same world as the Singing Stones, but it does not ask permission before it enters the dark.",
      ],
      pl: [
        "W dawnych czasach fragmenty Księżyca zaczęły spadać na obrzeża starożytnego Królestwa Twórców. Nazwano je Śpiewającymi Kamieniami, ponieważ nuciły cichy dźwięk, który pozwalał słuchającym dostrzec większą całość.",
        "Ludzie zbierali się, aby słuchać, i powoli zaczęli rozumieć. Kamienie nauczyły leśny lud czytać gwiazdy, a gwiazdy odkryły przed nimi sekretny język liści. Z czasem stali się jednością z naturą. Poznawali prawdę z kory drzew i mądrość z oddechu powietrza. Tak narodził się Las Upadłych Gwiazd.",
        "Lecz pokój nie trwał wiecznie. Po wybuchu Wojen Żywiołów ludzie zaczęli szukać potężniejszej broni. Zwrócili wzrok ku kamieniom lasu i poprosili leśny lud o zgodę na ich badanie, budując ośrodek badawczy nad starożytnym jeziorem, w miejscu, gdzie spadła większość gwiazd.",
        "Głęboko w komnatach Galerii Gwiazd poszukiwanie wiedzy zmieniło się w szaleństwo. Nie szukali pokoju, lecz władzy. Ich umysły pożarła chciwość. Zażądali kolejnych kamieni, nawet tych najświętszych, czczonych przez Krąg Księżyca.",
        "Tak rozpoczęło się ludobójstwo. Najpierw płonęły drzewa. Potem wodzowie. Lud leśny uciekł w cień, a z pomocą Księżyca znalazł schronienie pod nocnym niebem.",
        "W najniższym poziomie Galerii Twórcy połączyli fragmenty Tellusa, Boga Ziemskiego Żywiołu, z fragmentami Księżyca. Wbrew naturze stworzyli Kamień Wiedzy, artefakt znający to, co było, co jest i co może nadejść. Prawa wszechświata stały się widoczne. Ukryta tkanina świata mogła zostać nagięta, rozerwana i przepisana samą myślą.",
        "Z tą mocą zbudowali urządzenie zdolne zabić bogów walczących przeciwko nim. Na szczycie Gór Spadających Gwiazd powstało Obserwatorium, urządzenie mogące manipulować samymi gwiazdami.",
        "Gwiazdy odpowiedziały i dały druidom Starożytne Moce. Leśny lud zyskał możliwość zrzucenia śmiertelnej skóry i stania się bestiami kłów i pazurów. Rozpoczęli polowanie na magów, rozrywając ich w rytuałach pod czerwonym księżycem i składając ich na Ołtarzu Księżyca.",
        "Nadeszła Noc Czerwonego Księżyca. Twórca, pan Galerii Gwiazd, wszedł na szczyt Obserwatorium. Użył Kamienia Wiedzy, aby nagiąć niebiosa i zmusić gwiazdy do spadnięcia na Żywioły oraz królestwa swoich wrogów.",
        "Tego dnia katastrofa roztrzaskała świat. Ziemia pękła, wody wzniosły się w potężne tsunami, a wulkany przebudziły się, gdy prawa natury zostały rozdarte. Nawet Słońce spaliło wszystkich, którzy stali na szczycie. Wydarzenie nazwano Pierwszym Zaćmieniem, a spalone cienie Twórców wciąż polują na szczycie.",
        "Kamień był zbyt potężny, aby gwiazdy mogły go zniszczyć. Zawarto pakt. Ukryto go w Sercu Tellusa, w najgłębszej komnacie pod starożytnym Królestwem Magów, za drzwiami widocznymi i możliwymi do otwarcia tylko przez Maskę Twórcy. Maskę pochowano w Galerii Gwiazd wraz ze szczątkami Twórcy, a następnie Galeria została zatopiona pod jeziorem dzięki Ondzie, Bogini Wody.",
        "Dwa tysiące lat później pokój powoli powrócił. Ludzie wycofali się do miast, a druidzi znów stali się jednością z lasem. Obcy nie byli już mile widziani. Niektórzy, którzy weszli między drzewa, nigdy nie wrócili, bo druidzi nie zapomnieli tego, co im uczyniono.",
        "Quan, przebrany za Martina, przyszedł do wodzów i zapytał o położenie Galerii Gwiazd. Mówił jak stary przyjaciel lasu i twierdził, że chce odkryć to, co ukryto przed historią. Wodzowie nie zauważyli rzuconego uroku. Moses, Pasterz, zaczął prowadzić go nad Starożytne Jezioro.",
        "Zaklęcie zaczęło jednak znikać. Gdy Moses zrozumiał, kto stoi obok, ruszył do ataku. Quan został przebity na drzewie, ale zdążył wysączyć część jego siły życiowej. Kiedy się obudził, ciało łosia tonęło pod świętą ziemią, a korzenie zaczęły przenosić zarazę.",
        "W pobliskim stawie żyją Ribbitowie, plemię humanoidalnych żab. Kartografowie Lapis Arbor nazywają to miejsce Ribbiton, lecz dla zwykłej żaby jest to po prostu Staw. Żyją tam od początku czasu, a po Kataklizmie wykształciły własną kulturę. Ich wioska pełna jest zaokrąglonych chat z cegły mułowej, muzyki banjo, głośnego rechotu i zapachu pieczonych owadów.",
        "Dla Ribbitów dźwięk jest święty. Wierzą, że świat narodził się z jednego dźwięku, pierwotnej nuty, która przemierzyła pustkę i stworzyła fale. Aby uczcić ten cud, robią Dzwony Pamięci z księżycowych kamyków. Każda żaba otrzymuje dzwon o dźwięku należącym tylko do niej.",
        "Akira, lisia dama w panterzej postaci, gra na flecie na obrzeżach Ribbiton. Jest córką Ruborosa i Gayi. Zmaga się z drogą lasu, a jednocześnie nawiedza ją duch matki. Jej muzyka należy do tego samego świata co Śpiewające Kamienie, lecz nie pyta o pozwolenie, zanim wejdzie w ciemność.",
      ],
    },
  },
  {
    slug: "the-makers-and-the-stone-of-knowing",
    published: false,
    date: "2026-08-08",
    readingTime: "9 min",
    title: {
      en: "Stone of Knowing",
      pl: "Kamień Wiedzy",
    },
    subtitle: {
      en: "A history with too many missing pieces",
      pl: "Historia zbyt wielu brakujących fragmentów",
    },
    excerpt: {
      en: "An inhuman creation of the Makers - a Stone that knew the answer to every question. The pinnacle of technology of a fallen civilization and their ultimate downfall.",
      pl: "Nieludzki wytwór Twórców - Kamień, który znał odpowiedź na każde pytanie. Szczyt technologii upadłej cywilizacji i jednocześnie ich zguba.",
    },
    tags: ["worldbuilding", "the Makers", "Stone of Knowing", "dark fantasy"],
    images: [
      {
        src: "/images/journal/the-first-stone.png",
        alt: {
          en: "The First Stone beneath the trees",
          pl: "Pierwszy Kamień pośród drzew",
        },
        afterParagraph: 0,
      },
      {
        src: "/images/journal/fall-of-mankind.png",
        alt: {
          en: "A figure looking upon the fall of the Makers",
          pl: "Postać patrząca na upadek Twórców",
        },
        afterParagraph: 8,
      },
      {
        src: "/images/journal/cordia.png",
        alt: {
          en: "A forgotten city above the clouds",
          pl: "Zapomniane miasto ponad chmurami",
        },
        afterParagraph: 11,
      },
    ],
    paragraphs: {
      en: [
        "In the ancient past, fragments of the Moon began falling on the outskirts of Lapis Arbor. They were called the Singing Stones, for they hummed with a faint sound that could grant listeners a glimpse of the greater whole.",
        "People gathered there to listen. The Stones taught the forest people how to read the stars, and the stars revealed the secret language of the leaves. In time they became one with nature. They learned truth from the bark of trees and wisdom from the breath of the Air.",
        "Peace did not last forever. After the rise of the Elemental Wars, humans sought stronger weapons. They asked the Forest Folk for permission to study the stones and built a research facility upon the ancient lake, where most of the stars had fallen.",
        "The place became known as the Gallery of Stars. What happened inside its chambers is told in fragments, and every fragment seems to have been left by somebody who wanted the rest forgotten.",
        "The search for knowledge turned to madness. The Makers demanded more stones, even those revered by the Circle of the Moon. First the trees burned. Then the chieftains. The people of the forest fled into the shadows, helped by the Moon.",
        "Deep within the lowest level of the Gallery, fragments of the Earth Elemental God Tellus were mixed with fragments of the Moon. In defiance of nature, the Makers created the Stone of Knowing. It knew what was, what is, and what might yet come to be.",
        "The laws of the universe became visible to them. The hidden fabric that held the world together could be bent, snapped, and rewritten by thought alone. With this power they built a contraption capable of killing the gods who warred against them, and raised an Observatory atop the Starfell Mountains to manipulate the stars.",
        "The forest folk changed as well. They gained the power to shed their mortal skin and become beasts of fang and claw. In moonlit rituals they hunted the mages and tore them apart, siphoning their stolen power.",
        "Then came the Night of the Red Moon. The Maker climbed to the summit of the Starfell Observatory and used the Stone to force the stars upon Tellus. The earth cracked. Waters rose into towering tsunamis. Volcanoes awoke. The laws of the world were torn apart.",
        "The gods and the Druids killed the Maker, but not the Stone. It was too powerful to destroy. A pact was made instead. The Stone would be hidden within the Heart of Tellus, in the deepest chamber beneath Lapis Arbor, behind doors that could only be seen and opened through the Mask of the Maker.",
        "The Mask was buried with the Maker's remains inside the Gallery. Then the Water Goddess drowned the entire facility beneath the lake. Onda, Abuss'Abal, chieftain of the Druids, swore to guard the secret for eternity. He took the form of a great serpent and was sealed within the tomb.",
        "That is the version that survived. It leaves out the names of most of the dead, the shape of the contraption, and what the Stone whispered before the Gallery went under. Outsiders who enter the forest still disappear. Beneath the Red Moon, the Druids continue their rituals. Perhaps they are guarding the Stone. Perhaps they are guarding the world from what the Stone already knows.",
      ],
      pl: [
        "W dawnych czasach fragmenty Księżyca zaczęły spadać na obrzeża Lapis Arbor. Nazwano je Śpiewającymi Kamieniami, ponieważ nuciły cichy dźwięk, który pozwalał słuchającym dostrzec większą całość.",
        "Ludzie zbierali się, by słuchać. Kamienie nauczyły leśny lud czytać gwiazdy, a gwiazdy odkryły przed nimi sekretny język liści. Z czasem stali się jednością z naturą. Poznawali prawdę z kory drzew i mądrość z oddechu Powietrza.",
        "Pokój nie trwał wiecznie. Po wybuchu Wojen Żywiołów ludzie zaczęli szukać potężniejszej broni. Poprosili leśny lud o zgodę na badanie kamieni i zbudowali ośrodek badawczy nad starożytnym jeziorem, gdzie spadła większość gwiazd.",
        "Miejsce nazwano Galerią Gwiazd. To, co wydarzyło się w jej komnatach, opowiada się we fragmentach. Każdy z nich wygląda tak, jakby zostawił go ktoś, kto chciał, aby reszta została zapomniana.",
        "Poszukiwanie wiedzy zmieniło się w szaleństwo. Twórcy żądali kolejnych kamieni, nawet tych czczonych przez Krąg Księżyca. Najpierw płonęły drzewa. Potem wodzowie. Leśny lud uciekł w cień, a pomógł mu Księżyc.",
        "Głęboko w najniższym poziomie Galerii fragmenty Tellusa, Boga Ziemskiego Żywiołu, połączono z fragmentami Księżyca. Wbrew naturze Twórcy stworzyli Kamień Wiedzy. Znał to, co było, co jest i co może nadejść.",
        "Prawa wszechświata stały się dla nich widoczne. Tkaninę, która podtrzymywała świat, można było nagiąć, rozerwać i przepisać samą myślą. Zbudowali urządzenie zdolne zabić walczących z nimi bogów, a na szczycie Gór Spadających Gwiazd wznieśli Obserwatorium.",
        "Leśny lud również się zmienił. Zyskał moc zrzucania śmiertelnej skóry i stawania się bestiami kłów i pazurów. W rytuałach przy świetle księżyca polował na magów i rozrywał ich, wysysając skradzioną moc.",
        "Nadeszła Noc Czerwonego Księżyca. Twórca wszedł na szczyt Obserwatorium i użył Kamienia, by zmusić gwiazdy do uderzenia w Tellusa. Ziemia pękła. Wody wzniosły się w tsunami. Przebudziły się wulkany. Prawa świata zostały rozdarte.",
        "Bogowie i druidzi zabili Twórcę, lecz nie Kamień. Był zbyt potężny, aby go zniszczyć. Zawarto więc pakt. Kamień miał zostać ukryty w Sercu Tellusa, w najgłębszej komnacie pod Lapis Arbor, za drzwiami widocznymi i możliwymi do otwarcia tylko przez Maskę Twórcy.",
        "Maskę pochowano ze szczątkami Twórcy w Galerii. Następnie Bogini Wody zatopiła cały ośrodek pod jeziorem. Onda, Abuss'Abal, chieftain druidów, przysiągł strzec sekretu przez wieczność. Przyjął postać wielkiego węża i został zapieczętowany w grobowcu.",
        "To wersja, która przetrwała. Nie wymienia większości zmarłych, kształtu urządzenia ani tego, co Kamień wyszeptał, zanim Galeria zniknęła pod wodą. Obcy wciąż znikają w lesie. Pod Czerwonym Księżycem druidzi nadal odprawiają rytuały. Być może strzegą Kamienia. Być może strzegą świata przed tym, co Kamień już wie.",
      ],
    },
  },
];

const lastDawnChapter = journalEntries.find(
  (entry) => entry.slug === "the-last-dawn-chapter-one",
);
if (lastDawnChapter) {
  lastDawnChapter.title = {
    en: "The Last Dawn  -  Chapter One",
    pl: "The Last Dawn  -  Rozdział pierwszy",
  };
  lastDawnChapter.subtitle = {
    en: darkProphecy.en.title,
    pl: darkProphecy.pl.title,
  };
  lastDawnChapter.readingTime = "30 min";
  lastDawnChapter.paragraphs = {
    en: [prophecy.en, ...darkProphecy.en.paragraphs],
    pl: [prophecy.pl, ...darkProphecy.pl.paragraphs],
  };
}

export function getJournalEntry(slug: string) {
  return journalEntries.find((entry) => entry.slug === slug);
}

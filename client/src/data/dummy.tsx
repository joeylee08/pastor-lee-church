import { Photo } from "../types/Photo";

const dummyMessages = [
  {
		id: 1,
    title: "믿음으로 걸어가는 길",
    date: "2026-11-08",
		createdAt: '',
    message: `Faith is not always about knowing exactly where we are going. Sometimes it is about taking the next step even when the road ahead remains uncertain. Every day presents opportunities to practice patience, kindness, and understanding toward the people around us.

We often become so concerned with reaching our destination that we forget to appreciate the journey itself. The conversations we share, the challenges we overcome, and the small acts of generosity we encounter all contribute to our growth.

A community of faith reminds us that we do not have to face life's difficulties alone. Through fellowship and encouragement, we discover strength that we might not have recognized within ourselves.

There will be moments when our confidence weakens and our plans do not unfold as expected. During those times, we can remember that progress does not always appear dramatic. Sometimes growth happens quietly through consistent effort and sincere reflection.

As we begin another week, let us approach each day with gratitude. Let us listen carefully, speak thoughtfully, and offer encouragement wherever it is needed.

May our actions reflect the values we hold dear, and may we continue learning how to walk together with compassion and hope.`
  },
  {
		id: 2,
    title: "감사하는 마음",
    date: "2026-11-01",
		createdAt: '',
    message: `Gratitude has a remarkable ability to change the way we experience ordinary life. When we focus exclusively on what we lack, even our greatest blessings can become difficult to recognize. Yet when we begin noticing the good things surrounding us, our perspective gradually changes.

Consider the simple moments that fill our days. A conversation with a friend, a meal shared with family, or a quiet morning can offer opportunities for appreciation. These experiences may seem insignificant, but they form the foundation of a meaningful life.

Our community provides countless reasons to practice gratitude. We learn from one another, support each other through challenges, and celebrate the accomplishments of those around us.

Of course, gratitude does not mean ignoring hardship. Difficult circumstances deserve acknowledgment, and suffering should never be dismissed. Instead, gratitude invites us to recognize that goodness and difficulty can exist together.

This week, consider taking a few moments each evening to reflect on something that brought encouragement into your life. Perhaps it was an unexpected kindness or an opportunity to help someone else.

As we practice gratitude, may we develop generous hearts and a deeper appreciation for the people and experiences that enrich our lives.`
  },
  {
		id: 3,
    title: "사랑과 섬김",
    date: "2026-10-25",
		createdAt: '',
    message: `Love becomes most meaningful when it is expressed through action. Words of encouragement are valuable, but the choices we make each day demonstrate the sincerity of our concern for others.

Serving our community does not require extraordinary resources or remarkable abilities. Sometimes a small gesture can make a meaningful difference. Helping a neighbor, preparing a meal, or simply listening to someone who feels overlooked can communicate genuine compassion.

We frequently imagine that meaningful service must involve large projects or public recognition. Yet many of the most important contributions happen quietly, without an audience.

Within our congregation, we have opportunities to practice this kind of service regularly. Each person brings different experiences, perspectives, and strengths. When we work together, these differences become sources of encouragement rather than division.

We should also remember that service requires humility. Helping others is not an opportunity to demonstrate superiority. It is an expression of our shared humanity and our responsibility to care for one another.

As we move through the coming days, let us remain attentive to the needs around us. May we recognize opportunities for kindness and respond with generosity.

Through our actions, may our community become a place where people feel welcomed, respected, and genuinely loved.`
  },
  {
		id: 4,
    title: "함께하는 공동체",
    date: "2026-10-18",
		createdAt: '',
    message: `A strong community is not measured only by the number of people who gather together. Its strength is revealed through the relationships that develop and the care that its members demonstrate toward one another.

Every congregation includes individuals with different backgrounds, experiences, and expectations. These differences can occasionally create misunderstandings, but they also provide opportunities for learning and growth.

When we approach one another with patience and curiosity, we begin recognizing the value of perspectives beyond our own. Genuine fellowship requires more than occupying the same room. It involves listening carefully, offering support, and making room for others to participate.

Small communities have a particular opportunity to develop meaningful relationships. We can learn each other's stories, recognize when someone is struggling, and celebrate important moments together.

However, these relationships require consistent attention. Trust develops through reliability, honesty, and the willingness to remain present when circumstances become difficult.

Let us consider how we can contribute to a welcoming environment. Perhaps we can introduce ourselves to someone new, invite a neighbor to join us, or reconnect with someone we have not seen recently.

May our congregation continue becoming a community defined by kindness, hospitality, and a sincere commitment to walking alongside one another.`
  },
  {
		id: 5,
    title: "새로운 시작과 소망",
    date: "2026-10-11",
		createdAt: '',
    message: `Every new beginning carries a combination of excitement and uncertainty. We may feel hopeful about the opportunities ahead while also remembering the difficulties of previous experiences.

It is natural to hesitate when approaching unfamiliar circumstances. Change often requires us to reconsider established habits, develop new skills, and accept that improvement takes time.

Yet the possibility of growth remains available throughout our lives. Our past experiences may influence our present circumstances, but they do not have to determine every decision we make in the future.

A supportive community can make new beginnings less intimidating. When people offer encouragement instead of judgment, individuals become more willing to learn, ask questions, and persevere through mistakes.

We should extend this same patience to ourselves. Meaningful progress rarely follows a perfectly straight path. There will be setbacks, unexpected challenges, and moments when we question our abilities.

During these experiences, hope reminds us that today's difficulties do not represent the entirety of tomorrow's possibilities.

As another week begins, let us approach our responsibilities with renewed purpose. May we remain open to learning, generous toward those around us, and patient with our own development.

Every day presents another opportunity to begin again, and every small step can contribute to a meaningful journey.`
  }
];

const dummyPhotos: Photo[] = [
  {
    id: 1,
    url: "/church1.png",
    storageKey: "church1.png",
    caption: "교회 전경",
    createdAt: "2026-11-01",
  },
  {
    id: 2,
    url: "/church1.png",
    storageKey: "church1.png",
    caption: "주일 예배",
    createdAt: "2026-11-02",
  },
  {
    id: 3,
    url: "/church1.png",
    storageKey: "church1.png",
    caption: "교회 친교",
    createdAt: "2026-11-03",
  },
  {
    id: 4,
    url: "/church1.png",
    storageKey: "church1.png",
    caption: "성도들의 모임",
    createdAt: "2026-11-04",
  },
  {
    id: 5,
    url: "/church1.png",
    storageKey: "church1.png",
    caption: "교회 행사",
    createdAt: "2026-11-05",
  },
];

export { dummyMessages, dummyPhotos }
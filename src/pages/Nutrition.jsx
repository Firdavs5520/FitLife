import PageWrapper from "../components/PageWrapper";

export default function Nutrition() {
  const weeklyMeals = [
    {
      day: "Dushanba",
      breakfast: "Yog‘urt, yulaf, mevalar",
      lunch: "Sabzavotli salat, tovuq go‘shti",
      dinner: "Baliq, brokkoli, yashil choy",
    },
    {
      day: "Seshanba",
      breakfast: "Omlet, pomidor, qora non",
      lunch: "Qaynatilgan tuxum, sabzavotli salat",
      dinner: "Tovuq go‘shti, qovurilgan sabzavotlar",
    },
    {
      day: "Chorshanba",
      breakfast: "Sut, banan, yulaf",
      lunch: "Baliq, quinoa, sabzavotlar",
      dinner: "Tovuq go‘shti, brokkoli, yashil choy",
    },
    {
      day: "Payshanba",
      breakfast: "Omelet, bodring, avokado",
      lunch: "Sabzavotli sho‘rva, tovuq go‘shti",
      dinner: "Baliq, sabzavot salati, yashil choy",
    },
    {
      day: "Juma",
      breakfast: "Yog‘urt, mevalar, yulaf",
      lunch: "Tovuq go‘shti, sabzavot salati",
      dinner: "Baliq, brokkoli, yashil choy",
    },
    {
      day: "Shanba",
      breakfast: "Sut, tuxum, qora non",
      lunch: "Sabzavotli salat, tovuq go‘shti",
      dinner: "Baliq, qovurilgan sabzavotlar",
    },
    {
      day: "Yakshanba",
      breakfast: "Smoothie, banan, yulaf",
      lunch: "Tovuq go‘shti, sabzavotlar",
      dinner: "Baliq, brokkoli, yashil choy",
    },
  ];

  return (
    <PageWrapper title="🥗 Sog‘lom Ovqatlanish">
      <div className="p-4 flex flex-col gap-4">
        {weeklyMeals.map((day, idx) => (
          <div
            key={idx}
            className="p-4 shadow-md bg-gray-800/40 backdrop-blur-md rounded-2xl transition hover:scale-105 duration-300"
          >
            <h2 className="mb-3 text-xl font-bold text-white">{day.day}</h2>
            <div className="space-y-2 text-gray-200">
              <p>
                <span className="font-semibold">Ertalab:</span> {day.breakfast}
              </p>
              <p>
                <span className="font-semibold">Tushlik:</span> {day.lunch}
              </p>
              <p>
                <span className="font-semibold">Kechqurun:</span> {day.dinner}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

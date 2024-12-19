const getZodiacSign = (date: Date) => {
  const zodiacSigns = [
    { name: "Capricorn", start: [12, 22] },
    { name: "Aquarius", start: [1, 20] },
    { name: "Pisces", start: [2, 19] },
    { name: "Aries", start: [3, 21] },
    { name: "Taurus", start: [4, 20] },
    { name: "Gemini", start: [5, 21] },
    { name: "Cancer", start: [6, 21] },
    { name: "Leo", start: [7, 23] },
    { name: "Virgo", start: [8, 23] },
    { name: "Libra", start: [9, 23] },
    { name: "Scorpio", start: [10, 23] },
    { name: "Sagittarius", start: [11, 22] },
  ];

  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  for (let i = 0; i < zodiacSigns.length; i++) {
    const currentSign = zodiacSigns[i];
    const nextSign = zodiacSigns[(i + 1) % zodiacSigns.length];

    if (
      (month === currentSign.start[0] && day >= currentSign.start[1]) ||
      (month === nextSign.start[0] && day < nextSign.start[1])
    ) {
      return currentSign.name;
    }
  }

  return "Unknown"; // This should never happen if the date is valid
};

export default getZodiacSign;

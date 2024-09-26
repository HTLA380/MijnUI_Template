export const getRandomItem = (length: number): number => {
  return Math.floor(Math.random() * length);
};

/* -------------------------------------------------------------------------- */

export const getRandomDateTime = () => {
  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate(),
  );
  const randomDate = new Date(
    lastMonth.getTime() +
      Math.random() * (today.getTime() - lastMonth.getTime()),
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = `${months[randomDate.getMonth()]} ${randomDate.getDate()}, ${randomDate.getFullYear()}`;

  let hours = randomDate.getHours();
  const minutes = randomDate.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const time = `${hours}:${minutes} ${ampm}`;

  return { date, time };
};

/* -------------------------------------------------------------------------- */

export const getTimeInADayArray = (): string[] => {
  const timeArray: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const time = hour.toString().padStart(2, "0") + ":00";
    timeArray.push(time);
  }
  return timeArray;
};

/* -------------------------------------------------------------------------- */

export const getRandomContactId = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const length = 8;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/* -------------------------------------------------------------------------- */

export const generatePaths = (path: string) => {
  if (!path) {
    return [{ name: "", link: "" }];
  }
  // Split the path by "/" and filter out any empty parts
  const parts = path.split("/").filter((part) => part !== "");

  // Use the reduce function to iterate over the parts array and build the final array of objects
  return parts.reduce<{ name: string; link: string }[]>((acc, part, index) => {
    // Determine the new path for the current part based on the previous parts
    const newPath = index === 0 ? `/${part}` : `${acc[index - 1].link}/${part}`;

    // Create a new object representing the current part and its corresponding link
    const partObject = { name: part, link: newPath };

    // Add the part object to the accumulator array
    return [...acc, partObject];
  }, []);
};

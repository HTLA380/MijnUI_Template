// This function takes a path as input and generates an array of objects representing the path's parts
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

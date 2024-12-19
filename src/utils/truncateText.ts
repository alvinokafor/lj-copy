const truncateText = (text: string, charLimit: number) => {
  return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
};

export default truncateText;

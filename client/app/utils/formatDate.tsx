export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();

  if (timeDifference < 60000) {
    // Less than 1 minute ago
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} sec ago`;
  } else if (timeDifference < 3600000) {
    // Less than 1 hour ago
    const minutes = Math.floor(timeDifference / 60000);
    return `${minutes} min ago`;
  } else if (timeDifference < 259200000) {
    // Less than 72 hours ago
    const hours = Math.floor(timeDifference / 3600000);
    return `${hours} hours ago`;
  } else {
    // More than 72 hours ago
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }
};

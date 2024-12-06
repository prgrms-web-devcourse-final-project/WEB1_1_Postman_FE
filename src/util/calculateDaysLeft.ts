export const calculateDaysLeft = (writtenDate: string): number => {
    const currentDate = new Date();
    const letterDate = new Date(writtenDate);
    const timeDiff = currentDate.getTime() - letterDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return 30 - daysDiff;
};

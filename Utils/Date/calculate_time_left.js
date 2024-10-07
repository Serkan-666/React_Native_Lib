const calculate_time_left = (finish_date) => {
    try {
        const [day, month, yearAndTime] = finish_date.split('.');
        const [year, time] = yearAndTime.split(' ');
        const [hours, minutes] = time.split(':');
        const finishDate = new Date(year, month - 1, day, hours, minutes);

        const now = new Date();
        const diff = finishDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (days > 0) {
                return `${days} gün kaldı`;
            } else if (hours > 0) {
                return `${hours} saat kaldı`;
            } else if (minutes > 0) {
                return `${minutes} dakika kaldı`;
            } else {
                return 'Az önce bitti';
            }
        } else {
            return 'Süre doldu';
        }
    } catch (error) {
        return 'Süre doldu';
    }
};
export default calculate_time_left
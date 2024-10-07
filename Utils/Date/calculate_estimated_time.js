const calculate_estimated_time = (count, part = 5) => {
    try {
        return Math.ceil(count / part) * 2;
    } catch (error) {
        return 0
    }
};
export default calculate_estimated_time
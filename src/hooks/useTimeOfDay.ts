export const useTimeOfDay = () => {
    const today = new Date();
    const hours = today.getHours();

    /** 낮 : 6시 ~ 17시 까지 */
    const daytime = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    /** 해질녘 : 18시 ~ 19시 */
    const nightfall = [18, 19];

    /** 밤 : 20시 ~ 5시 까지 */
    const midnight = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5];

    // return 'daytime';
    // return 'nightfall';
    // return 'midnight';

    if (daytime.includes(hours)) return 'daytime';
    if (nightfall.includes(hours)) return 'nightfall';
    if (midnight.includes(hours)) return 'midnight';

    // 예외의 상황인 경우 기본값 daytime 리턴
    return 'daytime';
};

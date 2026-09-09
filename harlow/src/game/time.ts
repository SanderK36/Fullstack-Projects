export function advanceTime(currentTime: number, minutes: number) : {time: number; dayChanged: boolean} {
    const newTime = currentTime + minutes

    if (newTime >= 1440) {
        const timeAfterMidnight = newTime - 1440;

        return {time: timeAfterMidnight, dayChanged: true};
    }

    return {time: newTime, dayChanged: false}
}
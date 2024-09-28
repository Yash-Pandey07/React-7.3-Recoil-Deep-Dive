import { atom, selector } from "recoil";

export const networkAtom =atom({
    key : "networkAtom",
    default : 100
});

export const jobsAtom =atom({
    key : "jobsAtom",
    default : 2
});


export const messagingAtom =atom({
    key : "messagingAtom",
    default : 4 
});

export const notificationAtom =atom({
    key : "notificationAtom",
    default : 10
});

export const totalNotificationSelector = selector ({
    key: "totalNotificationSelector",
    get: ({ get }) => {
        const networkCount = get(networkAtom);
        const jobsCount = get(jobsAtom);
        const messagingCount = get(messagingAtom);
        const notificationCount = get(notificationAtom);

        // Calculate the total
        return (
            networkCount +
            jobsCount +
            messagingCount +
            notificationCount
        );
    },
});
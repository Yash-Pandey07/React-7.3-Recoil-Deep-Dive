import { atom, selector } from "recoil";
import axios from "axios";

//commenting to use AXIOS
// export const networkAtom =atom({
//     key : "networkAtom",
//     default : 100
// });

// export const jobsAtom =atom({
//     key : "jobsAtom",
//     default : 2
// });


// export const messagingAtom =atom({
//     key : "messagingAtom",
//     default : 4 
// });

// export const notificationAtom =atom({
//     key : "notificationAtom",
//     default : 10
// });

//Using AXIOS 
export const notificationsAtom = atom({
    key: 'notificationsAtom',
    // default: {
    // //   networks: 0,
    // //   jobs: 0,
    // //   messaging: 0,
    // //   notifications: 0
    // }
    //using SELECTOR in atom helps to use Asynchronous Data Queries
    //https://recoiljs.org/docs/guides/asynchronous-data-queries
    default : selector({
        key : "notificationAtomSelector",
        get :  async () => {
            //await new Promise(r => setTimeout(r,5000)) // sleep for 5 sec
            const res = await  axios.get("http://localhost:3000/notifications")
            return res.data
        }
    })
  });

export const totalNotificationSelector = selector ({
    key: "totalNotificationSelector",
    //commenting
    // get: ({ get }) => {
    //     const networkCount = get(networkAtom);
    //     const jobsCount = get(jobsAtom);
    //     const messagingCount = get(messagingAtom);
    //     const notificationCount = get(notificationAtom);

    //     // Calculate the total
    //     return (
    //         networkCount +
    //         jobsCount +
    //         messagingCount +
    //         notificationCount
    //     );
    // }
    //using AXIOS
    get: ({ get }) => {
        const notificationData = get(notificationsAtom);
        const { networks = 0, jobs = 0, messaging = 0, notifications = 0 } = notificationData;
        return networks + jobs + messaging + notifications;
      },
});
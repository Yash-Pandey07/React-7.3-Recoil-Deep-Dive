import { useState, useMemo,useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilValue ,useRecoilState} from 'recoil'
//import { jobsAtom, messagingAtom, networkAtom, notificationAtom, totalNotificationSelector } from './assets/atom'
import { totalNotificationSelector ,notificationsAtom} from './assets/atom'

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

// New function to handle notification count calculation
function getNotificationCount(count) {
  return count > 99 ? "99+" : count;
}

function MainApp() {

  // Instead of creating separate constants like finalMessagingNotificationCount for each notification type, you can map through your notification counts dynamically using an array of atom states and button labels.

  // const networkNotificationCount = useRecoilValue(networkAtom);
  // const finalNetworkNotificationCount = getNotificationCount(networkNotificationCount);

  // const jobsNotificationCount = useRecoilValue(jobsAtom);
  // const finalJobsNotificationCount = getNotificationCount(jobsNotificationCount);

  // const messagingNotificationCount = useRecoilValue(messagingAtom);
  // const finalMessagingNotificationCount = getNotificationCount(messagingNotificationCount);

  // const notificationNotificationCount = useRecoilValue(notificationAtom);
  // const finalNotificationNotificationCount = getNotificationCount(notificationNotificationCount);
  // Array of notification atoms and corresponding button labels
  //commiting to modify it and use AXIOS
  // const notifications = [
  //   { atom: networkAtom, label: 'My Network' },
  //   { atom: jobsAtom, label: 'Jobs' },
  //   { atom: messagingAtom, label: 'Messaging' },
  //   { atom: notificationAtom, label: 'Notification' }
  // ];

  // Calculate total notification count
  // we should add useMemo to make this function
  // Calculate total notification count using useMemo
  // const totalNotificationCount = useMemo(() => {
  //   return notifications.reduce((total, { atom }) => {
  //     const count = useRecoilValue(atom);
  //     return total + count;
  //   }, 0);
  // }, notifications.map(({ atom }) => useRecoilValue(atom)));  // Dependency array based on atom values
  //above function will give error as "According to the React rules of hooks, you can't use hooks (like useRecoilValue) inside other hooks such as useMemo, useEffect, or useCallback."
  // so insted of useMemo here we will use Selector in atom.js 

  // const totalNotificationCount = notifications.reduce((total, { atom }) => {
  //   const count = useRecoilValue(atom);
  //   return total + count;
  // }, 0);

  // Use the selector to get the total notification count
  //commenting
  // const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  // // Generate the buttons dynamically
  // const notificationButtons = notifications.map(({ atom, label }, index) => {
  //   const count = useRecoilValue(atom);
  //   const finalCount = getNotificationCount(count);
  //   return (
  //     <button key={index}>
  //       {label}({finalCount})
  //     </button>
  //   );
  // });

  //commenting
  // return (
  //   <>
  //     <button>Home</button>

  //     {/* 
  //    this code part is getting repetition
  //    <button>My Network({finalNetworkNotificationCount})</button>
  //    <button>Jobs({finalJobsNotificationCount})</button>
  //    <button>Messaging({finalMessagingNotificationCount})</button>
  //    <button>Notification({finalNotificationNotificationCount})</button> */}
  //     {notificationButtons}

  //     <button>Me({totalNotificationCount})</button>
  //   </>
  // )

  //using AXIOS

  const totalNotificationCount = useRecoilValue(totalNotificationSelector);
  console.log(totalNotificationCount)

   const [networkCount, setNetworkCount] = useRecoilState(notificationsAtom);

  //adding this useEffect increases load time and give flash of initial data and then load the data.So we can use selector at atom where we are initializing data for network, jobs,messaging, notifications .
  // useEffect(() => {
  //   axios.get("http://localhost:3000/notifications")
  //     .then(res => {
  //       if (res.data) {
  //         setNetworkCount(res.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error fetching notifications:", error);
  //     });
  // }, [setNetworkCount]);
  

  return (
    <>
      <button>Home</button>
      
      <button>My network ({networkCount.networks >= 100 ? "99+" : networkCount.networks})</button>
      <button>Jobs {networkCount.jobs}</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  )
}

export default App;

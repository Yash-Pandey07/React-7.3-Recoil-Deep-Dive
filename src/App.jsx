import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { jobsAtom, messagingAtom, networkAtom, notificationAtom, totalNotificationSelector } from './assets/atom'

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
  const notifications = [
    { atom: networkAtom, label: 'My Network' },
    { atom: jobsAtom, label: 'Jobs' },
    { atom: messagingAtom, label: 'Messaging' },
    { atom: notificationAtom, label: 'Notification' }
  ];

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
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  // Generate the buttons dynamically
  const notificationButtons = notifications.map(({ atom, label }, index) => {
    const count = useRecoilValue(atom);
    const finalCount = getNotificationCount(count);
    return (
      <button key={index}>
        {label}({finalCount})
      </button>
    );
  });

  return (
    <>
      <button>Home</button>

      {/* 
     this code part is getting repetition
     <button>My Network({finalNetworkNotificationCount})</button>
     <button>Jobs({finalJobsNotificationCount})</button>
     <button>Messaging({finalMessagingNotificationCount})</button>
     <button>Notification({finalNotificationNotificationCount})</button> */}
      {notificationButtons}

      <button>Me({totalNotificationCount})</button>
    </>
  )
}

export default App;

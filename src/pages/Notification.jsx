// import Notification from "../models/Notification.js";

// // Get logged-in user's notifications
// export const getNotifications = async (req, res) => {
//     try {
//         const notifications = await Notification.find({
//             user: req.user.id,
//         }).sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             notifications,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// // Mark one notification as read
// export const markAsRead = async (req, res) => {
//     try {
//         const notification = await Notification.findByIdAndUpdate(
//             req.params.id,
//             { isRead: true },
//             { new: true }
//         );

//         if (!notification) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Notification not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             notification,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// // Mark all notifications as read
// export const markAllRead = async (req, res) => {
//     try {
//         await Notification.updateMany(
//             { user: req.user.id, isRead: false },
//             { isRead: true }
//         );

//         res.status(200).json({
//             success: true,
//             message: "All notifications marked as read",
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// // Delete notification
// export const deleteNotification = async (req, res) => {
//     try {
//         const notification = await Notification.findByIdAndDelete(
//             req.params.id
//         );

//         if (!notification) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Notification not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Notification deleted successfully",
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaBell, FaTrash, FaCheck } from "react-icons/fa";

// const API = "http://localhost:3000/api";

// const Notification = () => {
//     const [notifications, setNotifications] = useState([]);
//     const token = localStorage.getItem("token");

//     const fetchNotifications = async () => {
//         try {
//             const { data } = await axios.get(`${API}/notifications`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             setNotifications(data.notifications);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchNotifications();
//     }, []);

//     const markAsRead = async (id) => {
//         try {
//             await axios.put(
//                 `${API}/notifications/read/${id}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             fetchNotifications();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const markAllRead = async () => {
//         try {
//             await axios.put(
//                 `${API}/notifications/read-all`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             fetchNotifications();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const deleteNotification = async (id) => {
//         try {
//             await axios.delete(`${API}/notifications/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             fetchNotifications();
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     return (
//         <div className="container py-4">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>
//                     <FaBell className="me-2 text-danger" />
//                     Notifications
//                 </h2>

//                 {notifications.length > 0 && (
//                     <button
//                         className="btn btn-success"
//                         onClick={markAllRead}
//                     >
//                         Mark All Read
//                     </button>
//                 )}
//             </div>

//             {notifications.length === 0 ? (
//                 <div className="alert alert-info text-center">
//                     No notifications found.
//                 </div>
//             ) : (
//                 notifications.map((notification) => (
//                     <div
//                         key={notification._id}
//                         className={`card shadow-sm mb-3 ${notification.isRead ? "" : "border-primary"
//                             }`}
//                     >
//                         <div className="card-body">

//                             <div className="d-flex justify-content-between align-items-start">

//                                 <div>
//                                     <h5 className="mb-1">
//                                         {notification.title}
//                                     </h5>

//                                     <p className="mb-2">
//                                         {notification.message}
//                                     </p>

//                                     <small className="text-muted">
//                                         {new Date(notification.createdAt).toLocaleString()}
//                                     </small>

//                                     <div className="mt-2">
//                                         {notification.isRead ? (
//                                             <span className="badge bg-success">
//                                                 Read
//                                             </span>
//                                         ) : (
//                                             <span className="badge bg-warning text-dark">
//                                                 Unread
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="d-flex gap-2">

//                                     {!notification.isRead && (
//                                         <button
//                                             className="btn btn-outline-success btn-sm"
//                                             onClick={() =>
//                                                 markAsRead(notification._id)
//                                             }
//                                         >
//                                             <FaCheck />
//                                         </button>
//                                     )}

//                                     <button
//                                         className="btn btn-outline-danger btn-sm"
//                                         onClick={() =>
//                                             deleteNotification(notification._id)
//                                         }
//                                     >
//                                         <FaTrash />
//                                     </button>

//                                 </div>

//                             </div>

//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default Notification;
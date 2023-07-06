import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import ActivityPage from './Pages/Dashboard/ActivityPage';
import ArrivalPage from './Pages/Dashboard/ArrivalPage';
import DeparturePage from './Pages/Dashboard/DeparturePage';
import StayOver from './Pages/Dashboard/StayOver';
import OtpPage from './Pages/Dashboard/OtpPage';
import GuestPage from './Pages/Dashboard/GuestPage';
import BookingDetails from './Pages/Dashboard/BookingDetails';
import ReservationPage from './Pages/Dashboard/ReservationPage';
import TypographyPage from './Pages/TypographyPage'
import Login from './Pages/Authentication/Login';
import Registration from './Pages/Authentication/Registration';
import ResetPassword from './Pages/Authentication/ResetPassword';
import ProfilePage from './Pages/Profile/ProfilePage';
import ChangePasswordPage from './Pages/Profile/ChangePasswordPage';
import UserPreferencesPage from './Pages/Profile/UserPreferencesPage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Rates from './Pages/Rooms/Rates';
import Baserate from './Pages/Rooms/Base_rate';
import Employee from './Pages/Options/Employee';
import Room from './Pages/Rooms/Room';
import Bookings from './Pages/Bookings';
import AddSubscriber from './Pages/Options/AddSubscriber';
import Property from './Pages/PropertyDetails/Property';
import EditProperty from './Pages/PropertyDetails/EditProperty';
import Checkin from './Pages/CheckinAndOut/Checkin';
import Roomservices from './Pages/Rooms/Roomservices';
import Subscription from './Pages/Options/Subscription'
import MakeReservation  from './Pages/Reservation/MakeReservation';
import Addroom from './Pages/Rooms/Add_room';
import Payment_report from './Pages/Reports/Payment_report';
import RoleTest from './Pages/RoleTest';
import RoomDetails from './Pages/Inventory/RoomDetails';
import Amenities from './Pages/Inventory/Amenities';
import EditRoomDetails from './Pages/Inventory/EditRoomDetails';
import Room_view from './Pages/Inventory/Room_view';
import PermissionAssignAndEdit from './Pages/RolesAndPermission/PermissionAssignAndEdit';
import RoleAssign from './Pages/RolesAssign/RoleTable';
import Room_type from './Pages/Rooms/Room_type';

import Calendar_View from './Pages/Calendar/Calendar_View';
import Subscription_View from './Pages/Options/Subscription_View';
import UserDetails from './Pages/Options/UserDetails';
import Availability_Matrix from './Pages/Matrix/Availability_Matrix';
import Scanner from './Pages/Scanner/Scanner';
import BookingEngine from './Pages/Reservation/BookingEngine';
import ViewDetailsPage from './Pages/Reservation/ViewDetailsPage';
import NewPage from './Pages/Reservation/NewPage';
import BookingPage from './Pages/Reservation/BookingPage';

function App() {

  const url = "https://django.rhgl9cf0lt9s2.ap-south-1.cs.amazonlightsail.com/"
 // const url = "http://127.0.0.1:8000/"

  // comm
  return (
        <Router>
            <Routes>
                <Route exact path='/' element={<DashboardPage name=""/>} />

                <Route exact path='/login' element={<Login url={url} />} />
                <Route exact path='/register' element={<Registration url={url} />} />
                <Route exact path='/reset-password' element={<ResetPassword url={url} />} />
                <Route exact path='/profile' element={<ProfilePage url={url} name="Profile"/> } />
                <Route exact path='/change-password' element={<ChangePasswordPage url={url} />} />
                <Route exact path='/preferences' element={<UserPreferencesPage name="Preferences"/> } />
                <Route exact path='/typography' element={<TypographyPage name="Typography"/>} />
                <Route exact path='/rates' element={<Rates url={url} subtitle='Rooms >> Rates & Availability' name="Rates & Availability" />} />
                <Route exact path='/base_rates' element={<Baserate url={url} subtitle='Rooms >> Rates & Availability >> Base Rates' name="Base Rates" />} />
                <Route exact path='/employee' element={<Employee url={url} subtitle='Options >> Employee' name="Employee"/>} />
            
                <Route exact path='/room-details' element={<Room url={url} subtitle ='Room Management >> Room Details' name="Room Details"/>} />
                <Route path='/edit_room/:id' element={<Addroom url={url}  name="Edit room" />} />
                <Route exact path='/Add_room/' element={<Addroom url={url} subtitle='Room Management >> Room Details >> Add Room'  name="Add Room" />} />
                <Route exact path='/bookings' element={<Bookings url={url} subtitle='Rooms >> Bookings' name="Bookings" />} />
                <Route exact path='/room_services' element={<Roomservices url={url} name="Room Services" />} />
                <Route exact path='/payment_report' element={<Payment_report url={url} subtitle="Reports >> Payment Report" name='Payment Report' />} />
                <Route exact path='/make_reservation' element={<MakeReservation url={url} subtitle='Reservation >> Make Reservation'  name="Make Reservation"/>} />
                <Route exact path='/role' element={<RoleTest url={url} name="Role"/>} />

                <Route exact path='/Room-Availability' element={<RoomDetails url={url} subtitle='Room Management >> Room Availability' name="Room Availability"/>} />
                <Route exact path='/Amenities' element={<Amenities url={url} name="Inventory >> Room Details"/>} />
                <Route exact path='/EditRoomDetails' element={<EditRoomDetails url={url} />} />
                <Route exact path='/Room_view/:id' element={<Room_view url={url} subtitle="Inventory >> Room View" name='Room View'/>} />
                <Route exact path='/permission' element={<PermissionAssignAndEdit url={url} subtitle='Roles & Permission > Permission' name='Permission'/>}  />
                <Route exact path='/role_assign' element={<RoleAssign url={url} name="Role Assign" subtitle='Roles & Permission >> Manage Roles'/>} />

                <Route exact path='/room_type' element={<Room_type url={url} name="Room Type" subtitle='Room Management >> Room Type'/>} />
                <Route exact path='/calendar_view' element={<Calendar_View url={url} subtitle='Rooms >> Calendar' name="Calendar"/>} />
                <Route exact path='/availability_Matrix' element={<Availability_Matrix url={url} subtitle='Rooms >> Matrix' name="Matrix"/>} />
                <Route exact path='/Subscription/:id' element={<Subscription url={url} subtitle='Option >> Subscription' name="Subscription"/>} />
                <Route exact path='/SubscriptionView/' element={<Subscription_View url={url} subtitle='Option >> Subscription Details' name="Subscription Details"/>} />
                <Route exact path='/UserDetails/:id' element={<UserDetails url={url} subtitle='Option >> Subscription_View >> UserDetails' name="UserDetails"/>} />
                <Route exact path='/AddSubscriber/' element={<AddSubscriber url={url} subtitle='Option >> Subscription_View >> AddSubscriber' name="AddSubscriber"/>} />
                
                <Route exact path='/property-details' element={<Property url={url} name="Property Details" />} />
                <Route exact path='/edit-property' element={<EditProperty url={url} name="Edit Property" />} />
                <Route exact path='/Check-In-Check-Out' element={<Checkin url={url} name="Check-In And Check-Out" />} />	
                <Route exact path='/activityPage' element={<ActivityPage url={url} subtitle="Activity Page" />} />	
                <Route exact path='/reservationPage' element={<ReservationPage url={url} subtitle="Reservation Page" />} />	
                <Route exact path='/arrivalPage' element={<ArrivalPage url={url} subtitle="Arrival Page" />} />	
                <Route exact path='/departurePage' element={<DeparturePage url={url} subtitle="Departure Page" />} />
                <Route exact path='/stayOver' element={<StayOver url={url} subtitle="Stay-Over Page" />} />
                <Route exact path='/otpPage' element={<OtpPage url={url} subtitle="OTP Page" />} />	
                <Route exact path='/guestPage' element={<GuestPage url={url} subtitle="Guest Details" />} />	
                <Route exact path='/bookingDetails' element={<BookingDetails url={url} subtitle="Booking Details" />} />	
            
                <Route exact path='/BookingEngine' element={<BookingEngine url={url} subtitle="Reservation Page" />} />	

                <Route exact path='/NewPage' element={<NewPage url={url} subtitle="Reservation Page" />} />	
                <Route exact path='/ViewDetailsPage' element={<ViewDetailsPage url={url} subtitle="Reservation Page" />} />	
                <Route exact path='/bookingPage' element={<BookingPage url={url} subtitle="Reservation Page" />} />	
             
        
            </Routes>  
        </Router>
    )
}

export default App;
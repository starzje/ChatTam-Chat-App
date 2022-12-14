import { useState } from "react";
// redux and react-router-dom
import { selectUser } from "../../store/features/userSlice";
import { useSelector } from "react-redux";
// components
import DynamicChatPage from "../../routes/DynamicChatPage";
import Rooms from "./Rooms";
import Modal from "../../components/Modal";
import UserInfo from "./UserInfo";
import UserSidebar from "./UserSidebar";
// util npm package
import { AnimatePresence, motion } from "framer-motion";
import { Sling as Hamburger } from "hamburger-react";
//helpers
import { fadeInMobileAnimation } from "../../helpers/animations";

const Homepage = () => {
  const { user } = useSelector(selectUser);
  const [singleUserInfo, setSingleUserInfo] = useState([""]);
  const [openModal, setOpenModal] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  // on click open modal and sent current user information to singleuserinfo state
  const handleClickUser = (user) => {
    setSingleUserInfo(user);
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex min-h-screen ">
        {/* MOBILE SIDEBAR */}
        <section className="block md:hidden ">
          <div className="absolute z-50  top-3 left-5">
            <Hamburger
              color="#fff"
              toggled={toggleMobileMenu}
              toggle={() => setToggleMobileMenu((prev) => !prev)}
            />
          </div>

          <motion.div
            variants={fadeInMobileAnimation}
            initial="hidden"
            animate={toggleMobileMenu ? "open" : "closed"}
            exit="exit"
            className={` absolute z-40 w-full  left-0 top-0 ${
              toggleMobileMenu ? "block" : "hidden "
            } `}>
            {toggleMobileMenu && (
              <>
                <div className="pt-3 pb-5 pl-20 pr-10 text-center text-white bg-secondary-violet">
                  <div className="flex items-center justify-start gap-3 ">
                    <UserInfo user={user} />
                  </div>
                </div>
                <div className="w-full bg-gradient-to-b from-[#1c2232] to-[#18182a] flex ">
                  <div className="w-1/2">
                    <Rooms />
                  </div>
                  <div className="min-h-[calc(100vh-6.1rem)] max-h-[calc(100vh-6.1rem)]  border-x border-white border-opacity-30  w-full overflow-auto">
                    <UserSidebar
                      user={user}
                      handleClickUser={handleClickUser}
                    />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </section>
        {/* END MOBILE SIDEBAR */}
        <AnimatePresence>
          {openModal && (
            <Modal user={singleUserInfo} setOpenModal={setOpenModal} />
          )}
        </AnimatePresence>
        {/* DESKTOP SIDEBAR */}
        <section className="hidden w-1/2 md:block">
          {/* profile info */}
          <div className="text-white bg-gradient-to-r from-[#1c2232] to-[#18182a] flex justify-center border-opacity-30 items-center p-6 gap-7 border-b border-r  border-white ">
            <UserInfo user={user} handleClickUser={handleClickUser} />
          </div>
          <div className="flex ">
            {/* chat room*/}
            <div className="w-1/2 bg-gradient-to-b from-[#1c2232] to-[#18182a] ">
              <Rooms />
            </div>
            {/* user list */}
            <div className="min-h-[calc(100vh-6.1rem)] max-h-[calc(100vh-6.1rem)] bg-gradient-to-b from-[#121021] to-[#1c1a31] border-x border-white border-opacity-30  w-full overflow-auto">
              <UserSidebar user={user} handleClickUser={handleClickUser} />
            </div>
          </div>
        </section>
        {/* chat */}
        <section className="w-full min-h-screen bg-cover bg-hero-pattern ">
          <DynamicChatPage />
        </section>
      </div>
    </>
  );
};

export default Homepage;

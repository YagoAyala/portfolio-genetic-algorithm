import { useEffect, useState } from "react";

import { Icons, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

import styled from "styled-components";

import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineClear } from "react-icons/ai";

import { Trigger } from "./Trigger";
import { ItemActions } from "./ItemActions";
import { TimeTracker } from "./TimeTracker";

const variants = {
  container: {
    open: {
      y: 0,
      opacity: 1,
      display: "block",
    },
    closed: {
      y: -10,
      opacity: 0,
      display: "none",
    },
  },
  content: {
    open: {
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    },
    closed: {
      transition: { staggerChildren: 0.03, staggerDirection: -1 }
    },
  },
  item: {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 10,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  },
};

const Container = styled(motion.aside)`
  width: 500px;
  border-radius: 8px;
  position: absolute;
  right: 20px;
  top: 70px;
  z-index: 99;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Content = styled(motion.section)`
  background: #25272eed;
  overflow-y: scroll;
  overflow-x: hidden;
  color: #000;
  padding: 0.2rem 0.2rem 20px 0.2rem;
  position: relative;
  height: 300px;

  h4 {
    margin: 0;
    text-align: center;
    padding: 2rem;
  }
`;

const IconWrapper = styled.div`
  width: 32px;
`;

const ClearNotifications = styled.div`
  color: #fff;
  padding: 5px 15px 5px 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  p {
    margin: 0 0 0 5px;
    font-size: 14px;
  }

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }

  &:active {
    opacity: 0.8;
  }
`;

const WithoutNotification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 20px);

  p {
    font-size: 16px;
    color: #d0d0d0;
  }
`;

const Item = styled(motion.article)`
  display: grid;
  grid-template-columns: 40px 1fr 80px;
  gap: 8px;
  padding: 10px;
  background: #02040a57;
  border-radius: 6px;
`;

const Header = styled.header`
  background: #02040a;
  color: #fff;
  margin: 0;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    right: 53px;
    top: -22px;
    z-index: 9999;
    width: 0;
    height: 0;
    border-bottom: 20px solid #02040a;
    border-top: 15px solid transparent;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;;
  }
`;

const NotificationCenter = () => {
  const {
    clear,
    remove,
    unreadCount,
    notifications,
    markAllAsRead,
  } = useNotificationCenter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      markAllAsRead();
    }

    // eslint-disable-next-line
  }, [isOpen]);

  const displayIcon = (notification) => {
    if (notification.type === "success") {
      return Icons.success({
        theme: "dark",
        type: toast.TYPE.SUCCESS,
      });
    }

    if (notification.type === "error") {
      return Icons.error({
        theme: "dark",
        type: toast.TYPE.ERROR,
      });
    }

    if (notification.type === "info") {
      return Icons.info({
        theme: "dark",
        type: toast.TYPE.INFO,
      });
    }

    if (notification.type === "warning") {
      return Icons.warning({
        theme: "dark",
        type: toast.TYPE.WARNING,
      });
    }
  };

  return (
    <div>
      <Trigger onClick={() => setIsOpen(!isOpen)} count={unreadCount} />

      <Container
        initial={false}
        variants={variants.container}
        animate={isOpen ? "open" : "closed"}
      >
        <Header>
          <IoIosNotificationsOutline fontSize={35} color={"#fff"} /> <h3>Notificações</h3>
        </Header>

        <AnimatePresence>
          <Content
            variants={variants.content}
            animate={isOpen ? "open" : "closed"}
          >
            {(!notifications.length &&
              <WithoutNotification>
                <IoIosNotificationsOutline fontSize={50} color={"#d0d0d0"} />
                <p>Sem notificações.</p>
              </WithoutNotification>
            )}

            <AnimatePresence>
              {notifications.length &&
                <ClearNotifications onClick={() => clear()}>
                  <AiOutlineClear /> <p>Limpar tudo</p>
                </ClearNotifications>
              }

              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ scale: 0.1, opacity: 0, y: 10 }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    transition: { duration: 0.1 }
                  }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  style={{ padding: "10px 10px 0 10px" }}
                >
                  <Item key={notification.id} variants={variants.item}>
                    <IconWrapper>
                      {notification.icon || displayIcon(notification)}
                    </IconWrapper>

                    <div>
                      <div style={{ color: "#fff" }}>{notification.content}</div>
                      <TimeTracker createdAt={notification.createdAt} />
                    </div>

                    <ItemActions
                      remove={remove}
                      notification={notification}
                    />
                  </Item>
                </motion.div>
              ))}
            </AnimatePresence>
          </Content>
        </AnimatePresence>
      </Container>
    </div>
  );
}

export default NotificationCenter;

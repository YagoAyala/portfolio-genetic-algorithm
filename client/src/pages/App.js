import React, { useEffect, useMemo, useState, useLayoutEffect } from "react";

import { logout, verifyAuth } from "../hooks/Helper";

import Login from "./Login";
import Modules from "./Modules";
import History from "./History";
import Profile from "./Profile";
import Generate from "./Generate";
import Settings from "./Settings";
import Analytics from "./Analytics";
import Statistics from "./Statistics";

import Back from "../components/Back";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import "../styles/app.css";

const App = ({
  forceLogin,
}) => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState({});
  const [module, setModule] = useState("");
  const [loading, setLoading] = useState({
    show: false,
    currentStep: "",
  });

  useLayoutEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    return () => {
      verifyAuth();
    };
  }, []);

  useEffect(() => {
    if (forceLogin) {
      setUser({ logged: false });
    }
  }, [forceLogin]);

  const onChangeUser = (value) => {
    setUser(value);
  };

  const onChangeModule = (module) => {
    setModule(module);
  };

  const onChangeLoading = (value, currentStep) => {
    document.body.style.overflow = value ? "hidden" : "";
    setLoading({
      show: value,
      currentStep,
    });
  };

  const components = useMemo(() => {
    return {
      GENERATE() {
        return (
          <Generate
            list={list}
            user={user}
            setList={setList}
            onChangeLoading={onChangeLoading}
          />
        );
      },
      STATISTICS() {
        return <Statistics onChangeLoading={onChangeLoading} />
      },
      ANALYTICS() {
        return <Analytics onChangeLoading={onChangeLoading} />
      },
      HISTORY() {
        return <History onChangeLoading={onChangeLoading} />
      },
      PROFILE() {
        return (
          <Profile
            user={user}
            onChangeUser={onChangeUser}
            onChangeLoading={onChangeLoading}
          />
        );
      },
      SETTINGS() {
        return (
          <Settings
            user={user}
            onChangeUser={onChangeUser}
            onChangeLoading={onChangeLoading}
          />
        );
      },
    }
  }, [user, list]);

  return (
    <>
      {loading.show &&
        <Loading currentStep={loading.currentStep} />
      }

      {!user?.logged &&
        <Login
          onChangeUser={onChangeUser}
          onChangeLoading={onChangeLoading}
        />
      }

      {user?.logged &&
        <>
          <Header
            user={user}
            logout={logout}
            onChangeModule={onChangeModule}
          />

          {
            module ?
              <Back onChangeModule={onChangeModule} />
              :
              <Modules onChangeModule={onChangeModule} />
          }

          {components?.[module]?.()}

          {!module &&
            <Footer user={user} />
          }
        </>
      }
    </>
  );
};

export default App;

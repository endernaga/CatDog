import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DropMenu } from "./components/DropMenu";
import { SosForm } from "./components/SosForm";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { useAppDispatch, useAppSelector } from "./app/hook";
import * as likedActions from "./features/likedSlice";

function App() {
  const { isSosFormOpen } = useContext(GlobalContext);

 /*  function generateRandomString(length: number, characters: string): string {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generateRandomPassword(): string {
    const length = 8;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    return generateRandomString(length, characters);
  }

  function generateRandomUsername(): string {
    const length = 8;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return generateRandomString(length, characters);
  }

  const likedPrepearing = async () => {
    const existingUsername = localStorage.getItem('username');
    const existingPassword = localStorage.getItem('password');

  if (existingUsername && existingPassword) {
    // Логін за збереженими даними
    await dispatch(
      likedActions.userLogin({
        username: existingUsername,
        password: existingPassword,
      })
    );
  } else {
    // Генерація нових даних та реєстрація
    const randomUsername = generateRandomUsername();
    const randomPassword = generateRandomPassword();
    
    // Зберігання даних в localStorage
    localStorage.setItem('username', randomUsername);
    localStorage.setItem('password', randomPassword);

    await dispatch(
      likedActions.userRegister({
        username: randomUsername,
        password: randomPassword,
      })
    );
    
    await dispatch(
      likedActions.userLogin({
        username: randomUsername,
        password: randomPassword,
      })
    );
  }
  };

  useEffect(() => {
    likedPrepearing();
  }, []); */

  return (
    <div className="App">
      <div className="main-wrapper">
        <Header />
        <DropMenu />
        <main className="container">
          {isSosFormOpen && <SosForm />}
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;

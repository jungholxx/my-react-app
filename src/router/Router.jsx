import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Board from "../pages/Board/Board";
import BoardWrite from "../pages/Board/BoardWrite";
import BoardDetail from "../pages/Board/BoardDetail";
import Gallery from "../pages/Gallery/Gallery";
import GalleryDetail from "../pages/Gallery/GalleryDetail";
import Contact from "../pages/Contact/Contact";
import Grid from "../pages/Grid/Grid";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Game from "../pages/Game/Game";
import NumberGame from "../pages/Game/NumberGame";
import SnakeGame from "../pages/Game/SnakeGame";
import DinoGame from "../pages/Game/DinoGame";
import Practice from "../pages/Practice/Practice";

import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";

function Router() {

  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/grid"
          element={<Grid />}
        />

        <Route
          path="/board"
          element={<Board />}
        />

        <Route
          path="/board/write"
          element={<BoardWrite/>}
        />

        <Route
          path="/board/:id"
          element={<BoardDetail />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/gallery/:id"
          element={<GalleryDetail />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/practice"
          element={<Practice />}
        />

        <Route
          path="/game"
          element={<Game />}
        />

        <Route
          path="/game/number"
          element={<NumberGame />}
        />

        <Route
          path="/game/snake"
          element={<SnakeGame />}
        />

        <Route
          path="/game/dino"
          element={<DinoGame />}
        />
      </Route>

    </Routes>
  );
}

export default Router;
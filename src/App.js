import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/index';
import Login from './pages/auth/login';
import { LoginLayout } from './layouts/auth/layout';
import { Layout } from './layouts/dashboard/layout';
import UserManagement from './pages/customers';
import GameManagement from './pages/companies';
import WalletManagement from './pages/account';
import Settings from './pages/settings';
import ErrorPage from './pages/404';
import User from './pages/single-user';
import Game from './pages/single-game';
import DeclareResult from './pages/result';
import BidHistory from './pages/bids';
import WinHistory from './pages/winning';
import GameRates from './pages/gamerates';
import Notification from './pages/notification';
import UnApproved from './pages/unapproved';
import AddFund from './pages/addfund';
import PreWinner from './pages/prewinner';
import BidWinReport from './pages/bidwinreport';
import BidRevert from './pages/bidrevert';
import WithdrawReport from './pages/withdrawreport';
import Games from './pages/games';
import AutoDeposit from './pages/auto-deposit';

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  return (
    <>
      {isLoginRoute &&
        (<LoginLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </LoginLayout>)}
      {!isLoginRoute && (
        <>
          <Layout>
            <Routes>
              {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/unapproved" element={<UnApproved />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/games" element={<GameManagement />} />
              <Route path="/games/rates" element={<GameRates />} />
              <Route path="/game/:game" element={<Games />} />
              <Route path="/games/:id" element={<Game />} />
              <Route path="/withdraw" element={<WalletManagement />} />
              <Route path="/withdrawreport" element={<WithdrawReport />} />
              <Route path="/autodeposit" element={<AutoDeposit />} />
              <Route path="/addfund" element={<AddFund />} />
              <Route path="/bids" element={<BidHistory />} />
              <Route path="/bid" element={<BidRevert />} />
              <Route path="/bidwin" element={<BidWinReport />} />
              <Route path="/winning" element={<WinHistory />} />
              <Route path="/prewinner" element={<PreWinner />} />
              <Route path="/result" element={<DeclareResult />} />
              <Route path="/send" element={<Notification />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Layout>
        </>
      )}
    </>
  );
}

export default App;

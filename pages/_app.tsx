import '../styles/global.css';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';
import { createWrapper } from 'next-redux-wrapper';

// default function App({ Component, pageProps }: AppProps) {

//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   )
// }

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const makestore =  () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(App);
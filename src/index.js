import './index.html'
import dva from 'dva'
import { browserHistory } from 'dva/router';
// import createHistory from 'history/createBrowserHistory';
// import createLoading from 'dva-loading';


 // import { useRouterHistory } from 'dva/router';
 // import { createHashHistory } from 'history';

// 1. Initialize
//const app = dva()

const app = dva({
  history: browserHistory,
 //history: createHistory()
//history: useRouterHistory(createHashHistory)({ queryKey: false }),
})

// 2. Model
//app.use(createLoading())
 app.model(require('./models/app'))
app.model(require('./models/dashboard'))
 app.model(require('./models/users'))

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root')

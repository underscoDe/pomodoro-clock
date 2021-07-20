function App() {
  const [displayTime, setDisplayTime] = React.useState(25 * 60);
  const [breakTime, setBreakTime] = React.useState(5 * 60);
  const [sessionTime, setSessionTime] = React.useState(25 * 60);
  const [timerOn, setTimerOn] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);
  const [breakAudio, setBreakAudio] = React.useState(new Audio('https://www.soundjay.com/buttons/beep-01a.mp3'));

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  };

  const formatTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (minutes < 10 ? "0" + minutes : minutes) + ':' + (seconds < 10 ? "0" + seconds : seconds);
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime(prev => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime(prev => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime(prev => {
            if (prev <= 0 && !onBreakVariable) {
              playBreakSound();
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              playBreakSound();
              onBreakVariable = false;
              setOnBreak(false);
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    }

    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }

    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "center-align" }, /*#__PURE__*/
    React.createElement("h1", null, "Pomodoro Clock"), /*#__PURE__*/
    React.createElement("div", { className: "dual-container" }, /*#__PURE__*/
    React.createElement(Lenght, {
      time: breakTime,
      title: "Break length",
      changeTime: changeTime,
      type: "break",
      formatTime: formatTime }), /*#__PURE__*/

    React.createElement(Lenght, {
      time: sessionTime,
      title: "Session length",
      changeTime: changeTime,
      type: "session",
      formatTime: formatTime })), /*#__PURE__*/


    React.createElement("h3", null, onBreak ? 'Break' : 'Session'), /*#__PURE__*/
    React.createElement("h1", null, formatTime(displayTime)), /*#__PURE__*/
    React.createElement("button", { className: "btn-large pink accent-3 mx-2", onClick: controlTime },

    timerOn ? /*#__PURE__*/
    React.createElement("i", { className: "material-icons" }, "pause_circle_filled") : /*#__PURE__*/

    React.createElement("i", { className: "material-icons" }, "play_circle_filled")), /*#__PURE__*/



    React.createElement("button", { className: "btn-large pink accent-3 mx-2", onClick: resetTime }, /*#__PURE__*/
    React.createElement("i", { className: "material-icons" }, "autorenew"))));



}

function Lenght({ title, changeTime, type, time, formatTime }) {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h3", null, title), /*#__PURE__*/
    React.createElement("div", { className: "time-sets" }, /*#__PURE__*/
    React.createElement("button", { className: "btn-small pink accent-3",
      onClick: () => changeTime(-60, type) }, /*#__PURE__*/
    React.createElement("i", { className: "material-icons" }, "arrow_downward")), /*#__PURE__*/

    React.createElement("h3", null, formatTime(time)), /*#__PURE__*/
    React.createElement("button", { className: "btn-small pink accent-3",
      onClick: () => changeTime(60, type) }, /*#__PURE__*/
    React.createElement("i", { className: "material-icons" }, "arrow_upward")))));




}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#root'));
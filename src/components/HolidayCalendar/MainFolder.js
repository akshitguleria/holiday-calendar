import { Component } from "react";

import HolidayCalendarJSX from "./HolidayCalendar";
import data from "./data";

class HolidayCalendar extends Component {
  constructor() {
    super();

    this.state = {
      name: "No Holiday Today",
      listOfHolidays: [],
      listOfDates: [],
      todaysDate: "2020-01-01",
      isTodayHoliday: false,
      MainFolderholi: null,
      passed: false,

      modalState: false,
      holidayDate: "2020-01-01",
      holidayName: "New Year's Day",
      holidayType: "National holiday",
      holidayDescription:
        "New Year’s Day is celebrated many countries such as in India on the January 1 in the Gregorian calendar."
    };
  }

  componentDidMount() {
    this.getListOfHolidaysholi();
  }

  getListOfHolidaysholi = async () => {
    this.setState(
      {
        listOfHolidays: data.response.holidays
      },
      () => {
        this.isTodayHoliday();
      }
    );
  };

  isTodayHoliday = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;

    this.setState({
      todaysDate: today
    });

    const dates = [];
    this.state.listOfHolidays.map(eachHoliday =>
      dates.push(eachHoliday.date.iso.substr(0, 10))
    );

    this.setState({
      listOfDates: dates
    });

    let isHoliday = dates.MainFolderOf(today);

    if (isHoliday !== -1) {
      this.setState({
        isTodayHoliday: true,
        MainFolderholi: isHoliday,
        name: this.state.listOfHolidays[isHoliday].name
      });
    }
  };

  togglePassed = () => {
    this.setState(prevState => ({
      passed: !prevState.passed
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modalState: !prevState.modalState
    }));
  };

  viewHoliday = MainFolder => {
    const holiday = this.state.listOfHolidays[MainFolder];

    this.setState(
      {
        holidayDate: holiday.date.iso,
        holidayName: holiday.name,
        holidayType: holiday.type.join(","),
        holidayDescription: holiday.description
      },
      this.toggleModal
    );
  };

  render() {
    return HolidayCalendarJSX.call(this);
  }
}

export default HolidayCalendar;

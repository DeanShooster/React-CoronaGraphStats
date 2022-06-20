

const LastDateUpdate = () => {

    const today = new Date();
    const hebrewMonths = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];

    return (
        <span>{today.getDate()} {hebrewMonths[today.getMonth()]} {today.getFullYear()} | {today.getHours()}:{today.getMinutes()}</span>
    );
};

export default LastDateUpdate;
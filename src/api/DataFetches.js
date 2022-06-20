const server = require('./config/const');

/**
 * Sends a GET request to the server to fetch General Stats.
 * @returns Data object with all general stats.
 */
async function GetGeneralStats()
{
    const res = await fetch(`${server}/stats/general`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch last week stats.
 * @returns Data object with all last week stats.
 */
async function GetLastWeekStats()
{
    const res = await fetch(`${server}/stats/last_week`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch city vaccinations stats and general percentages.
 * @returns Data object with all city stats.
 */
async function GetCityVaccinationStats()
{
    const res = await fetch(`${server}/stats/city_vaccination`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch sick people each day.
 * @returns Array object with all sick ( separated by level of sickness ) people each day.
 */
async function GetSick()
{
    const res = await fetch(`${server}/stats/sick`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch daily sick of people each day.
 * @returns Array object with all daily sick people each day.
 */
async function GetDailySick()
{
    const res = await fetch(`${server}/stats/daily_sick`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch weekly avg of verified sick people.
 * @returns Array object with all weekly avg information.
 */
async function GetWeeklyVerifiedAvg()
{
    const res = await fetch(`${server}/stats/weekly_verified_avg`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch total dead and avg.
 * @returns Array with total dead and avg.
 */
async function GetDeadAvg()
{
    const res = await fetch(`${server}/stats/dead_avg`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch epidemic status.
 * @returns Array with epidemic status.
 */
async function GetEpidemic()
{
    const res = await fetch(`${server}/stats/epidemic`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch hospitalized people who occupy a bed.
 * @returns Array with hospitalized bed status.
 */
async function GetBedHospitalized()
{
    const res = await fetch(`${server}/stats/bed_hospitalized`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch verified children.
 * @returns Array with verified children with age gaps.
 */
async function GetVerifiedChildren()
{
    const res = await fetch(`${server}/stats/child_verified`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch isolated children.
 * @returns Array with isolated children with age gaps.
 */
async function GetIsolatedChildren()
{
    const res = await fetch(`${server}/stats/child_isolated`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch hospitalized children.
 * @returns Array with hospitalized children with age gaps.
 */
async function GetHospitalizedChildren()
{
     const res = await fetch(`${server}/stats/child_hospitalized`);
     const data = await res.json();
     return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch sick children percent in a city.
 * @returns Array with sick children percent in a city.
 */
async function GetChildPercentCity()
{
    const res = await fetch(`${server}/stats/child_city_percent`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch sick and verified.
 * @returns Array with sick and vaccinated people.
 */
async function GetVaccinatedVerified()
{
    const res = await fetch(`${server}/stats/vaccinated_verified`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch sick and verified.
 * @returns Array with sick and vaccinated people.
 */
async function GetSeniorSeriouslySick()
{
    const res = await fetch(`${server}/stats/senior_seriously_sick`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch sick by age.
 * @returns Array with sick by age.
 */
async function GetSickByAge()
{
    const res = await fetch(`${server}/stats/sick_by_age`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch daily hospitalized.
 * @returns Array with daily hospitalized.
 */
async function GetDailyHospitalized()
{
    const res = await fetch(`${server}/stats/daily_hospitalized`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch daily dead and vaccinated.
 * @returns Array with daily dead and vaccinated.
 */
async function GetDailyDeadVaccinated()
{
    const res = await fetch(`${server}/stats/daily_dead_vaccinated`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch corona tests.
 * @returns Array with corona tests.
 */
async function GetCoronaTests()
{
    const res = await fetch(`${server}/stats/corona_tests`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch isolation reasons.
 * @returns Array with isolation reasons.
 */
async function GetIsolationReasons()
{
    const res = await fetch(`${server}/stats/isolation_reasons`);
    const data = await res.json();
    return ErrorHandle( data );
}

/**
 * Sends a GET request to the server to fetch vaccinated and sick stats.
 * @returns Array with vaccinated and sick stats.
 */
async function GetVaccinatedSickStats()
{
    const res = await fetch(`${server}/stats/sick_vaccinated`);
    const data = await res.json();
    return ErrorHandle( data );
}

// Generic error return handler.
const ErrorHandle = ( data) =>{
    if( data.Message )
        return null;
    return data;
}

module.exports = {GetGeneralStats,GetLastWeekStats,GetCityVaccinationStats,GetSick,GetDailySick,
                GetWeeklyVerifiedAvg,GetDeadAvg,GetEpidemic,GetBedHospitalized, GetVerifiedChildren,
                GetIsolatedChildren,GetHospitalizedChildren,GetChildPercentCity,GetVaccinatedVerified,
                GetSeniorSeriouslySick,GetSickByAge,GetDailyHospitalized,GetDailyDeadVaccinated,
                GetCoronaTests,GetIsolationReasons,GetVaccinatedSickStats};

    // Regular expressions for parsing latitude and longitude
    // Each regex has a tuple with the regexp and the data to extract
    // The data tuple contains:
    // - sign: index of the sign group (optional)
    // - nsew: index of the N/S or E/W group (optional)
    // - degrees: index or array of indices for degrees (optional)
    // - minutes: index for minutes (optional)
    // - seconds: index for seconds (optional)
    // - decimals: index or array of indices for decimals (optional)
    // The limit for latitude is 90 and for longitude is 180
    // The regexes are designed to match various formats of latitude and longitude
    // the description of the regexes is in the comments
    // they are gotten from Geographic Midpoint Calculator: http://www.geomidpoint.com/latlon.html

    // The coordinates can be in decimal format, or in degrees, minutes and seconds format.
    // The degrees, minutes and seconds format can have N/S or E/W indication before or after the value.
    // The degrees expressed in decimal format can have a leading minus sign for southern or western coordinates.
    // The degrees can be in the range of -90 to 90 for latitude and -180 to 180 for longitude.
    // Optional º can be used for degrees, also ' or " for minutes and seconds respectively.

    regexes = {
        latitude: [
            { // Only decimal degrees are allowed. May include 'N' or 'S', or a leading minus sign.
                // If 'N' or 'S' is present, the minus sign is ignored.
                regexp: /^([\-NnSs])?(90|[1-8]\d|0?\d)([,\.](\d+))?\s*[º°]?$/g,
                data: {sign: 1, nsew: 1, degrees: 2, minutes: null, seconds: null, decimals: 4},
                limit: 90 // Limit for latitude
            },
            { // Decimal degrees format only. An optional 'N' or 'S' can follow, and a negative sign can precede the value.
                // If 'N' or 'S' is present, the minus sign is ignored.
                regexp: /^(\-)?(90|[1-8]\d|0?\d)([,\.](\d+))?\s*\s*[º°]?([NnSs])$/g,
                data: {sign: 1, nsew: 5, degrees: 2, minutes: null, seconds: null, decimals: 4},
                limit: 90 // Limit for latitude
            },

            { // Degrees and minutes with decimals. May have N or S indication before.
                regexp: /^([NnSs])\s*(90|[1-8]\d|0?\d)\s*[º°\s]\s*(([1-5]\d|0?\d)([,\.](\d+))?\s*'?)$/g,
                data: {sign: null, nsew: 1, degrees: 2, minutes: 4, seconds: null, decimals: 6},
                limit: 90 // Limit for latitude
            },

            { // Degrees and minutes with decimals. May have E or W indication after.
                regexp: /^(90|[1-8]\d|0?\d)\s*[º°\s]\s*(([1-5]\d|0?\d)([,\.](\d+))?\s*'?)\s*([NnSs])?/g,
                data: {sign: null, nsew: 6, degrees: 1, minutes: 3, seconds: null, decimals: 5},
                limit: 90 // Limit for latitude
            },

            { // Degrees, minutes and seconds with decimals. May have E or W indication before.
                regexp: /^([NnSs])?\s*(90|[1-8]\d|0?\d)\s*[º°\s]\s*([1-5]\d|0?\d)\s*['\s]\s*(([1-5]\d|0?\d)([,\.](\d+))?\s*"?)$/g,
                data: {sign: null, nsew: 1, degrees: 2, minutes: 3, seconds: 5, decimals: 7},
                limit: 90 // Limit for latitude
            },
            { // Degrees, minutes and seconds with decimals. May have E or W indication before.
                regexp: /^(90|[1-8]\d|0?\d)\s*[º°\s]\s*([1-5]\d|0?\d)\s*['\s]\s*(([1-5]\d|0?\d)([,\.](\d+))?\s*"?)\s*([NnSs])?$/g,
                data: {sign: null, nsew: 7, degrees: 1, minutes: 2, seconds: 4, decimals: 6},
                limit: 90 // Limit for latitude
            },
        ],
            longitude: [
            { // Only decimal degrees are allowed. May include 'E' or 'W', or a leading minus sign.
                // If 'E' or 'W' is present, the minus sign is ignored.
                regexp: /^([-EeWw]?)\s*(180|1[0-7]\d|0?\d{1,2}|0)([,\.](\d+))?[º°]?$/g,
                data: {sign: 1, nsew: 1, degrees: 2, minutes: null, seconds: null, decimals: 4},
                limit: 180 // Limit for longitude
            },
            { // Decimal degrees format only. An optional 'N' or 'S' can follow, and a negative sign can precede the value.
                // If 'E' or 'W' is present, the minus sign is ignored.
                regexp: /^(\-)?(180|1[0-7]\d|0?\d{1,2}|0)([,\.](\d+))?\s*[º°]?\s*([EeWw])$/g,
                data: {sign: 1, nsew: 5, degrees: 2, minutes: null, seconds: null, decimals: 4},
                limit: 180 // Limit for longitude
            },

            { // Degrees and minutes with decimals. May have E or W indication before.
                regexp: /^([EeWw])\s*(180|1[0-7]\d|0?\d{1,2}|0)\s*[º°\s]\s*(([1-5]\d|0?\d)([,\.](\d+))?\s*'?\s*)$/g,
                data: {sign: null, nsew: 1, degrees: 2, minutes: 4, seconds: null, decimals: 6},
                limit: 180 // Limit for longitude
            },
            { // Degrees and minutes with decimals. May have E or W indication after.
                regexp: /^(180|1[0-7]\d|0?\d{1,2}|0)\s*[º°\s]\s*(([1-5]\d|0?\d)([,\.](\d+))?\s*'?\s*)([EeWw]?)$/g,
                data: {sign: null, nsew: 6, degrees: 1, minutes: 3, seconds: null, decimals: 5},
                limit: 180 // Limit for longitude
            },

            { // Degrees, minutes and seconds with decimals. May have E or W indication before.
                regexp: /^([EeWw])?\s*(180|1[0-7]\d|0?\d{1,2}|0)\s*[º°\s]\s*([1-5]\d|0?\d)\s*['\s]\s*(([1-5]\d|0?\d)([,\.](\d+))?\s*"?)$/g,
                data: {sign: null, nsew: 1, degrees: 2, minutes: 3, seconds: 5, decimals: 7},
                limit: 180 // Limit for longitude
            },
            { // Degrees, minutes and seconds with decimals. May have E or W indication after.
                regexp: /^(180|1[0-7]\d|0?\d{1,2}|0)\s*[º°\s]\s*([1-5]\d|0?\d)\s*['\s]\s*(([1-5]\d|0?\d)([,\.](\d+))?\s*"?)\s*([EeWw])?$/g,
                data: {sign: null, nsew: 7, degrees: 1, minutes: 2, seconds: 4, decimals: 6},
                limit: 180 // Limit for longitude
            },
        ]
    };

    // formatLatLon the latitude or longitude value to a human-readable format
    // the input value is a number, and latitude is a boolean indicating if the value is latitude (true) or longitude (false)
    // the output is a string in the format "12º 34' 56.789 N" or "12º 34' 56.789 E"
    function formatLatLon(value, latitude) {
        let result = '';
        let place = '';
        if (value === null || value === undefined || value.length == 0) return '';
        if (isNaN(value)) return '????';
        if (latitude) {
            if (value < -90 || value > 90) return '????';
            // result = value < 0 ? 'S ' : 'N ';
            place = value < 0 ? 'S' : 'N'
            value = Math.abs(value);
        } else {
            if (value < -180 || value > 180) return '????';
            // result = value < 0 ? 'W ' : 'E ';
            place = value < 0 ? 'W' : 'E';
            value = Math.abs(value);
        }
        const degrees = Math.floor(value);
        value = (value - degrees) * 60;
        const minutes = Math.floor(value);
        value = (value - minutes) * 60;
        const seconds = Math.floor(value);
        const decimals = Math.round((value - seconds) * 10000); // 4 decimal places for seconds
        if (decimals > 0) {
            result += `${degrees}º ${minutes}' ${seconds}.${decimals}" ${place}`;
        } else {
            result += `${degrees}º ${minutes}' ${seconds}" ${place}`;
        }
        return result;
    }

    // Inner filter function that applies a regular expression to a value.
    // It returns the calculated coordinate component (latitude o longitude)
    // as a string or null if the value does not match the regex.
    // The re_tuple contains the regular expression and the data to extract.
    // The limit is the maximum value for latitude (90) or longitude (180).
    function innerFilter(value, re_tuple) {
        const re = re_tuple.regexp;
        const data = re_tuple.data;
        const limit = re_tuple.limit;
        // Apply the regular expression to the value
        const result = re.exec(value);
        if (result) {
            // Extract the data from the result.
            // According to the data tuple, which contains the indices of the groups to extract.
            const sign = data.sign;
            const nsew = data.nsew;
            const degrees = data.degrees;
            const minutes = data.minutes;
            const seconds = data.seconds;
            const decimals = data.decimals;

            // Initialize the partial values to be calculated
            let sign_value = 1; // by default, positive sign
            let degrees_value = 0;
            let minutes_value = 0;
            let seconds_value = 0;
            let decimals_value = 0;

            // Check if there is a sign indication
            if (sign) {
                if (result[sign] === '-') sign_value = -1.0;
                else sign_value = 1.0;
            }
            // Check if there is a N/S or E/W indication
            if (nsew && result[nsew]) {
                if (result[nsew].toUpperCase() === 'N' || result[nsew].toUpperCase() === 'E') sign_value = 1.0;
                else sign_value = -1.0;
            }
            // Extract the degrees, minutes, seconds and decimals values from the result.
            // There can be multiple combinations of degrees, minutes, seconds and decimals
            // depending on the regular expression used.
            // option is used to handle the case where degrees, minutes, seconds or decimals.
            // The regular expressions can be defined to match multiple groups,
            // so we need to iterate through the groups to find the first non-null value.
            let option = 0;

            // If degrees, minutes, seconds or decimals are defined in the regex,
            // extract their values from the result.
            if (degrees) {
                if (Array.isArray(degrees)) {
                    let found = false;
                    while ((option < degrees.length) && !found) {
                        if (degrees[option] !== null && result[degrees[option]] !== undefined) {
                            let calculated = parseInt(result[degrees[option]], 10);
                            if (!isNaN(calculated)) {
                                degrees_value = calculated;
                                found = true;
                            }
                        }
                        option++;
                    }
                    // at the end of the loop option will be the index of the last degree found, then subtract 1 from it
                    option--;
                } else {
                    degrees_value = parseInt(result[degrees], 10);
                }
            }
            if (minutes) minutes_value = parseInt(result[minutes], 10);
            if (seconds) seconds_value = parseInt(result[seconds], 10);
            if (decimals) {
                if (Array.isArray(decimals)) {
                    decimals_value = parseFloat("0." + result[decimals[option]]);
                } else {
                    decimals_value = parseFloat("0." + result[decimals]);
                }
            } else {
                decimals_value = 0.0;
            }

            // Calculate the final value based on the degrees, minutes, seconds and decimals, and the sign.
            let calculated_value = 0.0;
            if (seconds) {
                seconds_value += decimals_value;
            } else if (minutes) {
                seconds_value = 0.0;
                minutes_value += decimals_value;
            } else if (degrees) {
                seconds_value = 0.0;
                minutes_value = 0.0;
                degrees_value += decimals_value;
            } else {
                return null;
            }

            calculated_value = (degrees_value + (minutes_value / 60.0) + (seconds_value / 3600.0));
            // if the absolute value is greater than the limit, set it to the limit
            if (calculated_value > limit) calculated_value = limit;
            // Apply the sign to the calculated value
            calculated_value *= sign_value;

            // Return the calculated value as a string with 8 decimal places. It's enough precision for describing coordinates
            // with 1 mm of resolution, and it avoids floating point issues.
            return calculated_value.toFixed(8);
        }
        return null;
    }

    // Filter the value using the regular expressions in the regexp_list.
    // It returns the first match found in the list of regular expressions.
    function filter(value, regexp_list) {
        let result = null;

        // Process the regexp_list. Look for a valid pattern.
        let idx = regexp_list.length - 1;
        while ((idx >= 0) && !result) {
            result = this.innerFilter(value, regexp_list[idx]);
            idx--;
        }
        return result;
    }

    // Read the latitude value from the parameter, and calculate the corresponding decimal value.
    function calculateLat(lat) {
        if (lat === null || lat === undefined || lat.length == 0) return "";
        let aux = this.filter(lat.trim(), this.regexes.latitude);
        if (aux) {
            return aux;
        } else {
            return "????";
        }
    }

    // Read the longitude value from the parameter, and calculate the corresponding decimal value.
    function calculateLon(lon) {
        if (lon === null || lon === undefined || lon.length == 0) return "";
        let aux = this.filter(lon.trim(), this.regexes.longitude);
        if (aux) {
            return aux;
        } else {
            return "????";
        }
    }


    // Recalculate the formatted latitude value based on the parameter.
    // Get the decimal values from the parameter, and format it to a human-readable string.
    function formatLat(lat) {
        let aux = this.calculateLat(lat.value, true);
        // let aux = this.formatLatLon(Number(lat.value), true);

        let input_field = document.getElementById("lati");
        if (aux && aux !== "????") {
            input_field.value = Number(aux);
            aux = this.formatLatLon(Number(aux), true);
        } else {
            input_field.value = ""
        }
        //window.alert("vista: " + lat.value + " -> " + aux+"\nvalor: "+input_field.value);
        lat.value = aux;
        return aux;
    }

    // Recalculate the formatted longitude value based on the parameter.
    // Get the decimal values from the parameter, and format it to a human-readable string.
    function formatLon(lon)  {
        let aux = this.calculateLon(lon.value, false);

        let input_field = document.getElementById("long");
        if (aux && aux !== "????") {
            input_field.value = Number(aux);
            aux = this.formatLatLon(Number(aux), false);
        } else {
            input_field.value = ""
        }
        //window.alert("vista: " + lon.value + " -> " + aux+"\nvalor: "+input_field.value);
        lon.value = aux;
        return aux;
    }

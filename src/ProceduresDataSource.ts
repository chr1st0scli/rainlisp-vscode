export class ProceduresDataSource {
    private static procedureDataSource: ProceduresDataSource;

    public static getProceduresDataSource(): ProceduresDataSource {

        if (!this.procedureDataSource) {
            this.procedureDataSource = new ProceduresDataSource();
        }

        return this.procedureDataSource;
    }

    public getProceduresMetadata(): PrimitiveProcedure[] {
        return this.primitiveProcedures;
    }

    private constructor() {}

    private primitiveProcedures: PrimitiveProcedure[] = [
        {
            name: '+',
            signature: '(+ num1 num2 . nums) | (+ str1 str2 . strs)',
            documentation: `\`(+ num1 num2 . nums)\`
Returns the sum of numeric values. It accepts two or more values.

\`(+ str1 str2 . strs)\`
Returns the concatenation of string values. It accepts two or more values.

[docs](RainLisp/Docs/primitives/plus.md)`
        },
        {
            name: '-',
            signature: '(- num1 num2 . nums)',
            documentation: `Returns the result of subtracting two or more numeric values. The subtraction accumulates from left to right.

[docs](RainLisp/Docs/primitives/minus.md)`
        },
        {
            name: '*',
            signature: '(* num1 num2 . nums)',
            documentation: `Returns the result of multiplying two or more numeric values.

[docs](RainLisp/Docs/primitives/multiply.md)`
        },
        {
            name: '/',
            signature: '(/ num1 num2 . nums)',
            documentation: `Returns the result of dividing two or more numeric values. The division accumulates from left to right.

[docs](RainLisp/Docs/primitives/divide.md)`
        },
        {
            name: '%',
            signature: '(% num1 num2 . nums)',
            documentation: `Returns the result of calculating the modulo of two or more numeric values. The operation accumulates from left to right.

[docs](RainLisp/Docs/primitives/modulo.md)`
        },
        {
            name: '<',
            signature: '(< num1 num2) | (< datetime1 datetime2)',
            documentation: `\`(< num1 num2)\`
Determines if the first numeric value is less than the second one.

\`(< datetime1 datetime2)\`
Determines if the first datetime is earlier than the second one, ignoring time zones.

[docs](RainLisp/Docs/primitives/less.md)`
        },
        {
            name: '<=',
            signature: '(<= num1 num2) | (<= datetime1 datetime2)',
            documentation: `\`(<= num1 num2)\`
Determines if the first numeric value is less than or equal to the second one.

\`(<= datetime1 datetime2)\`
Determines if the first datetime is the same as or earlier than the second one, ignoring time zones.

[docs](RainLisp/Docs/primitives/less-or-equal.md)`
        },
        {
            name: '=',
            signature: '(= value1 value2)',
            documentation: `Determines if two values are equal. Primitive values like numbers, strings, booleans and datetimes are compared by value. All others are compared by reference.

> In traditional Scheme LISP, there are two related primitives. *equal?* compares values and *eq?* compares references. RainLisp differentiates in this regard and encapsulates both with *=*.

[docs](RainLisp/Docs/primitives/equal.md)`
        },
        {
            name: '>',
            signature: '(> num1 num2) | (> datetime1 datetime2)',
            documentation: `\`(> num1 num2)\`
Determines if the first numeric value is greater than the second one.

\`(> datetime1 datetime2)\`
Determines if the first datetime is later than the second one, ignoring time zones.

[docs](RainLisp/Docs/primitives/greater.md)`
        },
        {
            name: '>=',
            signature: '(>= num1 num2) | (>= datetime1 datetime2)',
            documentation: `\`(>= num1 num2)\`
Determines if the first numeric value is greater than or equal to the second one.

\`(>= datetime1 datetime2)\`
Determines if the first datetime is the same as or later than the second one, ignoring time zones.

[docs](RainLisp/Docs/primitives/greater-or-equal.md)`
        },
        {
            name: 'add-days', 
            signature: '(add-days datetime num)', 
            documentation: `Returns a new datetime that adds the specified number of days to the specified datetime.

> *datetime* to add days to.

> *num* is the whole and fractional number of days to add, which can be positive or negative.

[docs](RainLisp/Docs/primitives/add-days.md)`
        },
        {
            name: 'add-hours', 
            signature: '(add-hours datetime num)', 
            documentation: `Returns a new datetime that adds the specified number of hours to the specified datetime.

> *datetime* to add hours to.

> *num* is the whole and fractional number of hours to add, which can be positive or negative.

[docs](RainLisp/Docs/primitives/add-hours.md)`
        },
        {
            name: 'add-milliseconds', 
            signature: '(add-milliseconds datetime num)', 
            documentation: `Returns a new datetime that adds the specified number of milliseconds to the specified datetime.

> *datetime* to add milliseconds to.

> *num* is the whole and fractional number of milliseconds to add, which can be positive or negative. Note that it is rounded to the nearest integer.
            
[docs](RainLisp/Docs/primitives/add-milliseconds.md)`
        },
        {
            name: 'add-minutes',
            signature: '(add-minutes datetime num)',
            documentation: `Returns a new datetime that adds the specified number of minutes to the specified datetime.

> *datetime* to add minutes to.

> *num* the whole and fractional number of minutes to add, which can be positive or negative.

[docs](RainLisp/Docs/primitives/add-minutes.md)`
        },
        {
            name: 'add-months',
            signature: '(add-months datetime num)',
            documentation: `Returns a new datetime that adds the specified number of months to the specified datetime.

> *datetime* to add months to.

> *num* is the number of months to add which can be positive or negative.

Note that only the integral part of months is considered.
            
[docs](RainLisp/Docs/primitives/add-months.md)`
        },
        {
            name: 'add-seconds',
            signature: '(add-seconds datetime num)',
            documentation: `Returns a new datetime that adds the specified number of seconds to the specified datetime.

> *datetime* to add seconds to.

> *num* is the whole and fractional number of seconds to add, which can be positive or negative.

[docs](RainLisp/Docs/primitives/add-seconds.md)`
        },
        {
            name: 'add-years',
            signature: '(add-years datetime num)',
            documentation: `Returns a new datetime that adds the specified number of years to the specified datetime.

> *datetime* to add years to.

> *num* is the number of years to add which can be positive or negative.

Note that only the integral part of years is considered.

[docs](RainLisp/Docs/primitives/add-years.md)`
        },
        {
            name: 'car',
            signature: '(car pair)',
            documentation: `Returns the first element of a pair.

[docs](RainLisp/Docs/primitives/car.md)`
        },
        {
            name: 'cdr',
            signature: '(cdr pair)',
            documentation: `Returns the second element of a pair.

[docs](RainLisp/Docs/primitives/cdr.md)`
        },
        {
            name: 'cons',
            signature: '(cons first second)',
            documentation: `Returns a pair made of the two given values.

[docs](RainLisp/Docs/primitives/cons.md)`
        },
        {
            name: 'datetime-to-string',
            signature: '(datetime-to-string datetime format)',
            documentation: `Converts a datetime to its equivalent string representation, using a specified format in [invariant](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture) culture.

> *datetime* to convert.

> *format* is a [standard](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings) or [custom](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings) date and time format string.

[docs](RainLisp/Docs/primitives/datetime-to-string.md)`
        },
        {
            name: 'day',
            signature: '(day datetime)',
            documentation: `Returns the day of the month of a given datetime value, expressed as a value between 1 and 31.

[docs](RainLisp/Docs/primitives/day.md)`
        },
        {
            name: 'days-diff',
            signature: '(days-diff datetime-from datetime-to)',
            documentation: `Returns the number of days, which can be positive or negative, between two datetimes.

> *datetime-from* is the datetime to subtract.

> *datetime-to* is the datetime to subtract the other one from.

[docs](RainLisp/Docs/primitives/days-diff.md)`
        },
        {
            name: 'debug',
            signature: '(debug primitive-value)',
            documentation: `Writes a primitive value to the trace listeners in the debug [listeners](https://learn.microsoft.com/en-us/dotnet/framework/debug-trace-profile/trace-listeners) collection. The format of the output is determined by the local culture. Its return value is unspecified.

> *primitive-value* is either a boolean, number, string or datetime.

[docs](RainLisp/Docs/primitives/debug.md)`
        },
        {
            name: 'display',
            signature: '(display primitive-value)',
            documentation: `Writes a primitive value to the standard output. The format of the output is determined by the local culture. Its return value is unspecified.

> *primitive-value* is either a boolean, number, string or datetime.

[docs](RainLisp/Docs/primitives/display.md)`
        },
        {
            name: 'error',
            signature: '(error primitive-value)',
            documentation: `Causes a user exception with a string representation of a primitive value to be thrown.
A numeric primitive value is formatted using the invariant culture but all other primitives use the local culture.

> *primitive-value* is either a boolean, number, string or datetime.

[docs](RainLisp/Docs/primitives/error.md)`
        },
        {
            name: 'eval',
            signature: '(eval quote-symbol) | (eval quote-symbols-list)',
            documentation: `\`(eval quote-symbol)\`
Returns a result by evaluating a quote symbol as user code.

\`(eval quote-symbols-list)\`
Returns a result by evaluating a non-empty list of quote symbols as user code.

[docs](RainLisp/Docs/primitives/eval.md)`
        },
        {
            name: 'hour',
            signature: '(hour datetime)',
            documentation: `Returns the hour of a given datetime value, expressed as a value between 0 and 23.

[docs](RainLisp/Docs/primitives/hour.md)`
        },
        {
            name: 'hours-diff',
            signature: '(hours-diff datetime-from datetime-to)',
            documentation: `Returns the number of hours, ranging from -23 through 23, between the times of two datetimes.

> *datetime-from* is the datetime to subtract.

> *datetime-to* is the datetime to subtract the other one from.

[docs](RainLisp/Docs/primitives/hours-diff.md)`
        },
        {
            name: 'index-of-string',
            signature: '(index-of-string str value start-index)',
            documentation: `Returns the zero-based index of the first occurence of a string withing another string. The search starts at a specified character position.
If the string is not found, -1 is returned. If the string to look for is empty, the return value is the start index.

> *str* is the string to search in.

> *value* is the string to look for.

> *start-index* is the search starting position. Note that only its integral part is considered.

[docs](RainLisp/Docs/primitives/index-of-string.md)`
        },
        {
            name: 'list',
            signature: '(list . values)',
            documentation: `Returns a new list made of the values provided, or nil if none is given.

[docs](RainLisp/Docs/primitives/list.md)`
        },
        {
            name: 'make-date',
            signature: '(make-date year month day)',
            documentation: `Returns a new datetime value in an unspecified time zone, made of a year, month and day of the month.

> *year* (1 through 9999).

> *month* (1 through 12).

> *day* (1 through the number of days in month).

Note that only the integral part of the arguments is considered.

[docs](RainLisp/Docs/primitives/make-date.md)`
        },
        {
            name: 'make-datetime',
            signature: '(make-datetime year month day hour minute second millisecond)',
            documentation: `Returns a new datetime value in an unspecified time zone, made of a year, month, day of the month, hour, minute, second and millisecond.

> *year* (1 through 9999).

> *month* (1 through 12).

> *day* (1 through the number of days in month).

> *hour* (0 through 23).

> *minute* (0 through 59).

> *second* (0 through 59).

> *millisecond* (0 through 999).

Note that only the integral part of the arguments is considered.

[docs](RainLisp/Docs/primitives/make-datetime.md)`
        },
        {
            name: 'millisecond',
            signature: '(millisecond datetime)',
            documentation: `Returns the millisecond of a given datetime value, expressed as a value between 0 and 999.

[docs](RainLisp/Docs/primitives/millisecond.md)`
        },
        {
            name: 'milliseconds-diff',
            signature: '(milliseconds-diff datetime-from datetime-to)',
            documentation: `Returns the number of milliseconds, ranging from -999 through 999, between the times of two datetimes.

> *datetime-from* is the datetime to subtract.

> *datetime-to* is the datetime to subtract the other one from.

[docs](RainLisp/Docs/primitives/milliseconds-diff.md)`
        },
        {
            name: 'minute',
            signature: '(minute datetime)',
            documentation: `Returns the minute of a given datetime value, expressed as a value between 0 and 59.

[docs](RainLisp/Docs/primitives/minute.md)`
        },
        {
            name: 'minutes-diff',
            signature: '(minutes-diff datetime-from datetime-to)',
            documentation: `Returns the number of minutes, ranging from -59 through 59, between the times of two datetimes.

> *datetime-from* is the datetime to subtract.

> *datetime-to* is the datetime to subtract the other one from.

[docs](RainLisp/Docs/primitives/minutes-diff.md)`
        },
        {
            name: 'month',
            signature: '(month datetime)',
            documentation: `Returns the month of a given datetime value, expressed as a value between 1 and 12.

[docs](RainLisp/Docs/primitives/month.md)`
        },
        {
            name: 'newline',
            signature: '(newline)',
            documentation: `Writes a new line to the standard output. Its return value is unspecified.

[docs](RainLisp/Docs/primitives/newline.md)`
        },
        {
            name: 'not',
            signature: '(not value)',
            documentation: `Returns the logical negation of a value. Every value is true except explicit false.

[docs](RainLisp/Docs/primitives/not.md)`
        },
        {
            name: 'now',
            signature: '(now)',
            documentation: `Returns the current date and time on this computer, expressed as the local time.

[docs](RainLisp/Docs/primitives/now.md)`
        },
        {
            name: 'null?',
            signature: '(null? value)',
            documentation: `Determines if the given value is nil, i.e. an empty list.

[docs](RainLisp/Docs/primitives/is-null.md)`
        },
        {
            name: 'number-to-string',
            signature: '(number-to-string num format)',
            documentation: `Converts a numeric value to its equivalent string representation, using a specified format in [invariant](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture) culture.

> *num* is a numeric value to convert.

> *format* is a numeric format string value. It can be a [standard](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) or [custom](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings) format.

[docs](RainLisp/Docs/primitives/number-to-string.md)`
        },
        {
            name: 'pair?',
            signature: '(pair? value)',
            documentation: `Determines if the given value is a pair.

[docs](RainLisp/Docs/primitives/is-pair.md)`
        },
        {
            name: 'parse-datetime',
            signature: '(parse-datetime str format)',
            documentation: `Converts a string representation of a datetime in [invariant](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture) culture to its datetime equivalent, using a specified format.

> *str* is the string containing the datetime info.

> *format* is a string specifying the exact format of the datetime info. It can be a [standard](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings) or [custom](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings) format.

[docs](RainLisp/Docs/primitives/parse-datetime.md)`
        },
        {
            name: 'parse-number',
            signature: '(parse-number str)',
            documentation: `Converts a string representation of a numeric value in [invariant](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture) culture to its number equivalent.

[docs](RainLisp/Docs/primitives/parse-number.md)`
        },
        {
            name: 'replace-string',
            signature: '(replace-string str old-value new-value)',
            documentation: `Returns a new string in which all occurrences of a substring within a given string are replaced by another one.
If the string to be replaced is not found, the original string is returned unchanged.

> *str* is the string to search in.

> *old-value* is the string to be replaced.

> *new-value* is the string to replace all occurrences of the old value.

[docs](RainLisp/Docs/primitives/replace-string.md)`
        },
        {
            name: 'round',
            signature: '(round num decimals)',
            documentation: `Rounds a numeric value to a specified number of fractional digits, using the away from zero rounding convention.
If the given numeric value to round has fewer fractional digits than the one specified, it is returned unchanged.

> *num* is a numeric value to round.

> *decimals* is the number of decimal places in the return value (0 through 28).

Note that only the integral part of decimal places is considered.

[docs](RainLisp/Docs/primitives/round.md)`
        },
        {
            name: 'second',
            signature: '(second datetime)',
            documentation: `Returns the second of a given datetime value, expressed as a value between 0 and 59.

[docs](RainLisp/Docs/primitives/second.md)`
        },
        {
            name: 'seconds-diff',
            signature: '(seconds-diff datetime-from datetime-to)',
            documentation: `Returns the number of seconds, ranging from -59 through 59, between the times of two datetimes.

> *datetime-from* is the datetime to subtract.

> *datetime-to* is the datetime to subtract the other one from.

[docs](RainLisp/Docs/primitives/seconds-diff.md)`
        },
        {
            name: 'set-car!',
            signature: '(set-car! pair value)',
            documentation: `Sets the first part of a pair to the value provided. Its return value is unspecified.

[docs](RainLisp/Docs/primitives/set-car!.md)`
        },
        {
            name: 'set-cdr!',
            signature: '(set-cdr! pair value)',
            documentation: `Sets the second part of a pair to the value provided. Its return value is unspecified.

[docs](RainLisp/Docs/primitives/set-cdr!.md)`
        },
        {
            name: 'string-length',
            signature: '(string-length str)',
            documentation: `Returns the length of a given string.

[docs](RainLisp/Docs/primitives/string-length.md)`
        },
        {
            name: 'substring',
            signature: '(substring str start-index length)',
            documentation: `Returns a substring value of a given string. The substring starts at a specified character position and has a specified length.
An empty string is returned if the start index is equal to the length of the string and the desired length is zero.

> *str* is the string to get a substring from.

> *start-index* is the zero-based start index.

> *length* is the length of the substring.

Note that only the integral part of the numeric arguments is considered.

> Note that in traditional LISP, the last parameter is not the length but a stop index. RainLisp differentiates in this regard.

[docs](RainLisp/Docs/primitives/substring.md)`
        },
        {
            name: 'to-local',
            signature: '(to-local datetime)',
            documentation: `Converts a Universal Coordinated Time (UTC) datetime value to local. It must be a UTC or unspecified datetime, in which case it is treated as UTC.

[docs](RainLisp/Docs/primitives/to-local.md)`
        },
        {
            name: 'to-lower',
            signature: '(to-lower str)',
            documentation: `Returns a copy of a string value converted to lower case using the casing rules of the [invariant](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture) culture.

[docs](RainLisp/Docs/primitives/to-lower.md)`
        },
        {
            name: 'to-upper',
            signature: '(to-upper str)',
            documentation: `Returns a copy of a string value converted to upper case using the casing rules of the [invariant](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture) culture.

[docs](RainLisp/Docs/primitives/to-upper.md)`
        },
        {
            name: 'to-utc',
            signature: '(to-utc datetime)',
            documentation: `Converts a local datetime value to Universal Coordinated Time (UTC). It must be a local or unspecified datetime, in which case it is treated as local.

[docs](RainLisp/Docs/primitives/to-utc.md)`
        },
        {
            name: 'trace',
            signature: '(trace primitive-value)',
            documentation: `Writes a primitive value to the trace listeners in the trace [listeners](https://learn.microsoft.com/en-us/dotnet/framework/debug-trace-profile/trace-listeners) collection. The format of the output is determined by the local culture. Its return value is unspecified.

> *primitive-value* is either a boolean, number, string or datetime.

[docs](RainLisp/Docs/primitives/trace.md)`
        },
        {
            name: 'utc-now',
            signature: '(utc-now)',
            documentation: `Returns the current date and time on this computer, expressed as the Coordinated Universal Time (UTC).

[docs](RainLisp/Docs/primitives/utc-now.md)`
        },
        {
            name: 'utc?',
            signature: '(utc? datetime)',
            documentation: `Determines if the given datetime is Coordinated Universal Time (UTC).

[docs](RainLisp/Docs/primitives/is-utc.md)`
        },
        {
            name: 'xor',
            signature: '(xor value1 value2 . values)',
            documentation: `Returns the result of calculating the logical xor of two or more values. The operation accumulates from left to right.

[docs](RainLisp/Docs/primitives/xor.md)`
        },
        {
            name: 'year',
            signature: '(year datetime)',
            documentation: `Returns the year of a given datetime value, expressed as a value between 1 and 9999.

[docs](RainLisp/Docs/primitives/year.md)`
        }
    ];
}

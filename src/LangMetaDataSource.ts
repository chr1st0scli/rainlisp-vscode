import { LangEntityMetadata, LangEntityType } from "./LangEntityMetadata";

export class LangMetaDataSource {

    public static readonly DOCS_BASE_URI = 'https://github.com/chr1st0scli/RainLisp/blob/master/';

    private static dataSource: LangMetaDataSource;

    public static getDataSource(): LangMetaDataSource {

        if (!this.dataSource) {
            this.dataSource = new LangMetaDataSource();
        }

        return this.dataSource;
    }

    public getMetadata(): LangEntityMetadata[] {
        return this.metadata;
    }

    public getMetadataFor(name: string): LangEntityMetadata | undefined {
        return this.metadataMap.get(name);
    }

    private constructor() {
        this.metadataMap = new Map<string, LangEntityMetadata>();

        this.metadata.forEach(element => {
            this.metadataMap.set(element.name, element);
        });
    }

    private metadataMap: Map<string, LangEntityMetadata>;

    // This is in accordance to the RainLisp documentation which is maintained in the corresponding repository.
    private metadata: LangEntityMetadata[] = [
        {
            name: 'nil',
            type: LangEntityType.Constant,
            signature: 'nil',
            documentation: `Returns the empty list. The empty list is a reference type and unique in a system wide scope. It also serves as list termination.

[docs](RainLisp/Docs/primitives/nil.md)`
        },

        //#region Special Forms & Derived Expressions.
        {
            name: 'and',
            type: LangEntityType.Keyword,
            signature: '(and expression . expressions)',
            documentation: `A derived expression that implements a logical and. It accepts at least one expression.

Each expression is evaluated from left to right, until one evaluates to false or the last expression is reached, in which case it is the result of the evaluation.

[docs](RainLisp/Docs/special-forms-derived-expressions/and.md)`
        },
        {
            name: 'begin',
            type: LangEntityType.Keyword,
            signature: '(begin expression . expressions)',
            documentation: `A special form for defining a block of expressions to evaluate in the order they appear.

It accepts at least one expression and the evaluation result of the \`begin\` itself, is the last expression's result.

[docs](RainLisp/Docs/special-forms-derived-expressions/begin.md)`
        },
        {
            name: 'cond',
            type: LangEntityType.Keyword,
            signature: '(cond (predicate expression . expressions) (else expression . expressions))',
            documentation: `A derived expression for declaring many alternative expressions to be evaluated based on the result of different predicates.
This is typically known as an \`if... else if... else...\` expression.
It has one or more conditional clauses, the \`(predicate expression . expressions)\` part, followed by an optional conditional else clause in the end.

The first expression of a conditional clause is the predicate. If it evaluates to true, the rest of the expressions
will be evaluated in turn and the last one's result will be the final one. If the predicates of all conditional clauses evaluate to false, the
conditional else clause is evaluated. The expressions are once again evaluated in the order they appear and the last one's result is the final one.
If no conditional else clause is provided, the final result is unspecified.

[docs](RainLisp/Docs/special-forms-derived-expressions/cond.md)`
        },
        {
            name: 'define',
            type: LangEntityType.Keyword,
            signature: '(define id expression) | (define (id . parameters) body)',
            documentation: `Definition is a special form for defining variables and procedures in the current scope.
The evaluation result of the definition itself is unspecified.

A variable is defined by its identifier \`id\`, followed by an expression that gives its value.

A procedure is defined by its identifier \`id\`, followed by zero or more parameters and a body.
The body consists of zero or more definitions, followed by at least one expression.
The expressions are evaluated in the order they appear and the evaluation result of the last one
is the final result of the procedure when called.

[docs](RainLisp/Docs/special-forms-derived-expressions/define.md)`
        },
        {
            name: 'if',
            type: LangEntityType.Keyword,
            signature: '(if predicate consequent alternative)',
            documentation: `A special form for declaring alternative expressions to be evaluated based on the result of a predicate.

The first expression is the predicate. The second is the consequent, which is evaluated if the predicate evaluates to true.
The optional last one is the alternative, which is evaluated if the predicate evaluates to false.
If the alternative is to be evaluated and there is none, the result is unspecified.

[docs](RainLisp/Docs/special-forms-derived-expressions/if.md)`
        },
        {
            name: 'lambda',
            type: LangEntityType.Keyword,
            signature: '(lambda (. parameters) body)',
            documentation: `A special form for creating a user procedure with zero or more parameters. The body is executed when the procedure is called.

The procedure's body consists of zero or more definitions, followed by at least one expression.
The expressions are evaluated in the order they appear and the evaluation result of the last one
is the final result of the procedure when called.

[docs](RainLisp/Docs/special-forms-derived-expressions/lambda.md)`
        },
        {
            name: 'let',
            type: LangEntityType.Keyword,
            signature: '(let ((id expression)) body)',
            documentation: `A derived expression for declaring variables and expressions using them, in a scope limited
within the \`let\` expression itself. It has one or more let clauses, the \`(id expression)\` part, which define the variables,
followed by a body.
            
A let clause starts with an \`id\` being the name of the variable, followed by an expression that gives its value.

The body consists of zero or more definitions, followed by at least one expression.
The expressions are evaluated in the order they appear and the evaluation result of the last one
is the final result of the \`let\` expression.

[docs](RainLisp/Docs/special-forms-derived-expressions/let.md)`
        },
        {
            name: 'delay',
            type: LangEntityType.Keyword,
            signature: '(delay expression)',
            documentation: `A special form that delays the evaluation of the given expression, effectively creating a promise to
evaluate it in the future. The evaluation result is a procedure which evaluates the expression when called.

[docs](RainLisp/Docs/special-forms-derived-expressions/delay.md)`
        },
        {
            name: 'cons-stream',
            type: LangEntityType.Keyword,
            signature: '(cons-stream expression expression)',
            documentation: `A derived expression for constructing a stream, i.e. a pair of an immediately evaluated expression and a delayed one.

The first expression is evaluated immediately and the second one is delayed. The result of the \`cons-stream\` expression is a pair made of the
value of the first expression and a procedure which evaluates the second one when called, i.e. a promise.

[docs](RainLisp/Docs/special-forms-derived-expressions/cons-stream.md)`
        },
        {
            name: 'or',
            type: LangEntityType.Keyword,
            signature: '(or expression . expressions)',
            documentation: `A derived expression that implements a logical or. It accepts at least one expression.

Each expression is evaluated from left to right, until one evaluates to true or the last expression is reached, in which case it is the result of the evaluation.

[docs](RainLisp/Docs/special-forms-derived-expressions/or.md)`
        },
        {
            name: 'quote',
            type: LangEntityType.Keyword,
            signature: '(quote quotable) | \'quotable',
            documentation: `A special form for creating quote symbols. A quote symbol can be viewed as a unique tag.
It is created based on something that can be quoted, i.e. a quotable.

There is an alternative form for creating a quote symbol that is equivalent to the above.
It starts with an apostrophe \`'\` and is followed by a quotable. This form is often preferred for brevity.

A quotable is anything that can be quoted. It can be a number, string or boolean literal, an identifier (e.g. variable name),
a language keyword or a list of zero or more quotables in the form \`(. quotables)\`.

[docs](RainLisp/Docs/special-forms-derived-expressions/quote.md)`
        },
        {
            name: 'set!',
            type: LangEntityType.Keyword,
            signature: '(set! id expression)',
            documentation: `Assignment is a special form for changing a variable's value.
\`id\` is the identifier of the variable to change and \`expression\` gives the new value.

The identifier needs to be visible in the current scope; otherwise, an error occurs.
The evaluation result of the assignment itself is unspecified.

[docs](RainLisp/Docs/special-forms-derived-expressions/set!.md)`
        },
        //#endregion

        //#region Primitive Procedures.
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
            name: 'ceiling',
            signature: '(ceiling num)',
            documentation: `Rounds a numeric value to the smallest integral that is greater than or equal to it.

> *num* is a numeric value to round.

[docs](RainLisp/Docs/primitives/ceiling.md)`
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
            name: 'floor',
            signature: '(floor num)',
            documentation: `Rounds a numeric value to the largest integral that is less than or equal to it.

> *num* is a numeric value to round.

[docs](RainLisp/Docs/primitives/floor.md)`
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
            name: 'parse-number-culture',
            signature: '(parse-number-culture str culture)',
            documentation: `Converts a string representation of a numeric value in a culture-specific format to its number equivalent.

> *str* is the string containing the numeric info.

> *culture* is a string specifying the culture name. If the culture name is an empty string, the [invariant](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture) culture is used.
For a list of valid names, look at the "*Language tag*" column of the [language table](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-lcid/a9eac961-e77d-41a6-90a5-ce1a8b0cdb9c).

[docs](RainLisp/Docs/primitives/parse-number-culture.md)`
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
        },
        //#endregion

        //#region Library Procedures.
        {
            name: 'append',
            signature: '(append list1 list2)',
            documentation: `Returns a new list by appending list2 to list1.

[docs](RainLisp/Docs/common-libraries/append.md)`
        },
        {
            name: 'filter',
            signature: '(filter predicate sequence)',
            documentation: `Returns a new list containing only the elements of a list that satisfy a condition.

> *predicate* is a procedure accepting a single argument (each element of *sequence* at a time) and its result is evaluated as a boolean.

> *sequence* is the list to filter.

[docs](RainLisp/Docs/common-libraries/filter.md)`
        },
        {
            name: 'flatmap',
            signature: '(flatmap proc sequence)',
            documentation: `Projects each element of a list to a list of many and flattens the results in a single list.

> *proc* is a procedure accepting a single argument (each element of *sequence* at a time) and returning a list.

> *sequence* is the list whose each element is mapped to many.

[docs](RainLisp/Docs/common-libraries/flatmap.md)`
        },
        {
            name: 'fold-left',
            signature: '(fold-left op initial sequence)',
            documentation: `Returns a result by accumulating a computation on a list from left to right.

> *op* is a procedure accepting two arguments and returning the result of accumulation on each step.

> *initial* is the seed of the accumulation.

> *sequence* is the list to accumulate.

The first *op* call's arguments is the initial seed followed by the first element of the list.

[docs](RainLisp/Docs/common-libraries/fold-left.md)`
        },
        {
            name: 'fold-right',
            signature: '(fold-right op initial sequence)',
            documentation: `Returns a result by accumulating a computation on a list from right to left.

> *op* is a procedure accepting two arguments and returning the result of accumulation on each step.

> *initial* is the seed of the accumulation.

> *sequence* is the list to accumulate.

The first *op* call's arguments is the last element of the list followed by the initial seed.

[docs](RainLisp/Docs/common-libraries/fold-right.md)`
        },
        {
            name: 'length',
            signature: '(length sequence)',
            documentation: `Returns the length of a list.

[docs](RainLisp/Docs/common-libraries/length.md)`
        },
        {
            name: 'map',
            signature: '(map proc sequence)',
            documentation: `Returns a new list with the projections of a given list's elements.

> *proc* is a procedure accepting a single argument (each element of *sequence* at a time) and returning a projection.

> *sequence* is the list whose each element is mapped to another one.

[docs](RainLisp/Docs/common-libraries/map.md)`
        },
        {
            name: 'reduce',
            signature: '(reduce op sequence)',
            documentation: `Returns a result by accumulating a computation on a list from left to right.

> *op* is a procedure accepting two arguments and returning the result of accumulation on each step.

> *sequence* is the list to accumulate.

[docs](RainLisp/Docs/common-libraries/reduce.md)`
        },
        {
            name: 'reverse',
            signature: '(reverse sequence)',
            documentation: `Returns a new list by reversing the elements of a given one.

[docs](RainLisp/Docs/common-libraries/reverse.md)`
        },
        {
            name: 'cdr-stream',
            signature: '(cdr-stream stream)',
            documentation: `Returns the rest of a stream, i.e. its next element by forcing its promise to be fulfilled and a promise for the rest of it.

[docs](RainLisp/Docs/common-libraries/cdr-stream.md)`
        },
        {
            name: 'filter-stream',
            signature: '(filter-stream predicate stream)',
            documentation: `Returns a new stream containing the first element of a stream that satisfies a condition and a promise for the rest of them.

> *predicate* is a procedure accepting a single argument (each element of *stream* at a time) and its result is evaluated as a boolean.

> *stream* is the stream to filter.

[docs](RainLisp/Docs/common-libraries/filter-stream.md)`
        },
        {
            name: 'force',
            signature: '(force proc)',
            documentation: `Executes a procedure and returns its result. Typically the procedure is a promise, i.e. a delayed expression that results from
[delay](RainLisp/Docs/special-forms-derived-expressions/delay.md).

> *proc* is the procedure to execute, typically a promise to evaluate an expression.

[docs](RainLisp/Docs/common-libraries/force.md)`
        },
        {
            name: 'make-range-stream',
            signature: '(make-range-stream start end)',
            documentation: `Returns a new stream of numeric values ranging from start until end. The first numeric value is evaluated and the evaluation of the
rest is deferred, i.e. delayed until explicitly requested. If start is greater than end, [nil](RainLisp/Docs/primitives/nil.md) is returned.

> *start* is the first value of the stream which is immediately evaluated.

> *end* is the last value of the stream.

[docs](RainLisp/Docs/common-libraries/make-range-stream.md)`
        },
        {
            name: 'map-stream',
            signature: '(map-stream proc stream)',
            documentation: `Returns a new stream with the projection of the first element and a promise for the projection of the rest of them.

> *proc* is a procedure accepting a single argument (each element of *stream* at a time) and returning a projection.

> *stream* is the delayed list whose each element is mapped to another one on demand.

[docs](RainLisp/Docs/common-libraries/map-stream.md)`
        },
        {
            name: 'at-list',
            signature: '(at-list items index)',
            documentation: `Returns the element of a list at a given position.

> *items* is the list to look for the required element in.

> *index* is the zero-based position of the required element in the list. If it is negative, zero is assumed.

[docs](RainLisp/Docs/common-libraries/at-list.md)`
        },
        {
            name: 'at-stream',
            signature: '(at-stream stream index)',
            documentation: `Returns the element of a stream at a given position. It fulfills the promises in the stream until the required position is reached.

> *stream* is the stream to look for the required element in.

> *index* is the zero-based position of the required element in the stream. If it is negative, zero is assumed.

[docs](RainLisp/Docs/common-libraries/at-stream.md)`
        },
        //#endregion
    ];
}

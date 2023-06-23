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
            label: 'add-days', 
            detail: '(add-days datetime num)', 
            documentation: `Returns a new datetime that adds the specified number of days to the specified datetime.

> *datetime* to add days to.

> *num* is the whole and fractional number of days to add, which can be positive or negative.

[docs](RainLisp/Docs/primitives/add-days.md)`
        },
        {
            label: 'add-hours', 
            detail: '(add-hours datetime num)', 
            documentation: `Returns a new datetime that adds the specified number of hours to the specified datetime.

> *datetime* to add hours to.

> *num* is the whole and fractional number of hours to add, which can be positive or negative.

[docs](RainLisp/Docs/primitives/add-hours.md)`
        },
        {
            label: 'add-milliseconds', 
            detail: '(add-milliseconds datetime num)', 
            documentation: `Returns a new datetime that adds the specified number of milliseconds to the specified datetime.

> *datetime* to add milliseconds to.

> *num* is the whole and fractional number of milliseconds to add, which can be positive or negative. Note that it is rounded to the nearest integer.
            
[docs](RainLisp/Docs/primitives/add-milliseconds.md)`
        },
        {
            label: 'add-minutes',
            detail: '(add-minutes datetime num)',
            documentation: `Returns a new datetime that adds the specified number of minutes to the specified datetime.

> *datetime* to add minutes to.

> *num* the whole and fractional number of minutes to add, which can be positive or negative.

[docs](RainLisp/Docs/primitives/add-minutes.md)`
        },
    ];
}

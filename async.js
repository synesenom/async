/**
 * Class for emulating asynchronous tasks.
 * Each new task is scheduled randomly at a later time, based on the number of
 * tasks in the queue and the estimated length of previous tasks.
 */
const Async = {
    /**
     * The estimated running time of a task, based on from the previous tasks.
     * It is initialized to 1.
     * @private
     */
    _delay: 1,

    /**
     * Total number of the tasks run so far.
     * @private
     */
    _counter: 0,

    /**
     * Number of remaining tasks to be run.
     * @private
     */
    _queue: 0,

    /**
     * Returns the timeout time delay for the next tasks.
     * Delay is calculated as: 1.5*D * (r + Q),
     * where D is the estimated running time of a task, Q is the queue length and r is a random number between
     * 0 and 1.
     *
     * @returns {number} Delay for next task in milliseconds.
     * @private
     */
    _scheduler: function() {
        return Math.floor(1.5 * this._delay * (Math.random() + this._queue));
    },

    /**
     * Schedules next task and updates estimated delay.
     *
     * @param task Task to run.
     * @param args Arguments passed to the task.
     */
    run: function(task, args) {
        var async = this;
        this._queue++;
        this._counter++;
        setTimeout(function() {
            var t = new Date().getTime();
            task(args);
            async._delay = (async._delay*(async._counter-1) + (new Date().getTime()-t)) / async._counter;
            async._queue--;
        }, this._scheduler());
    }
};
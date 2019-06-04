const fs = require("fs");
const test = require("tape");
const cleanMicroformats = require("../lib/cleanMicroformats");

test("cleanMicroformats.js", function(t) {
  t.plan(2);
  const body = '<a class="h-card" href="http://glennjones.net">Glenn</a>';

  cleanMicroformats(body, (err, data) => {
    t.equal(err, null, "should return callback without error");

    const expected = [
      {
        id: 1,
        type: "h-card",
        props: { name: "Glenn", url: "http://glennjones.net" },
        path: ["0", "type"],
        length: 2,
        level: 2
      }
    ];
    t.deepEqual(data, expected);
  });
});

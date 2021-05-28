const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Test Case Generator",
  });
});
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min + 1) + min).toFixed(4);
}

function randomNumberInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
router.post("/random/numbers", (req, res) => {
  const isFloat = req.body.isFloat;
  const minEle = req.body.minEle;
  const maxEle = req.body.maxEle;
  const numTestCases = req.body.numTestCases;
  const tcFlag = req.body.tcFlag;
  const isDistinct = req.body.isDistinct;
  const isSorted = req.body.isSorted;
  var resultJSON = {};
  if (maxEle - minEle + 1 < numTestCases && isDistinct) {
    resultJSON.message = "Invalid Constraints. Please Check them Again!!";
  } else {
    resultJSON.message = "Success!";
    var a = [];
    if (tcFlag) {
      resultJSON.tcFlag = tcFlag;
      resultJSON.numTestCases = numTestCases;
    }
    if (!isFloat) {
      for (var i = 0; i < numTestCases; i++) {
        var num = randomNumberInt(minEle, maxEle);
        if (isDistinct) {
          while (a.includes(num)) {
            num = randomNumberInt(minEle, maxEle);
          }
        }
        a.push(Number(num));
      }
    } else {
      for (var i = 0; i < numTestCases; i++) {
        var num = randomNumber(minEle, maxEle);
        if (isDistinct) {
          while (a.includes(num)) {
            num = randomNumber(minEle, maxEle);
          }
        }
        a.push(Number(num));
      }
    }
    if (isSorted) {
      a = a.sort(function (x, y) {
        return x - y;
      });
    }
    resultJSON.array = a;

    res.json(resultJSON);
  }
});
router.post("/random/arrays", (req, res) => {
  const isDistinct = req.body.isDistinct;
  const isInt = req.body.isInt;
  const maxEle = req.body.maxEle;
  const minEle = req.body.minEle;
  const numTestCases = req.body.numTestCases;
  const sizeMax = req.body.sizeMax;
  const sizeMin = req.body.sizeMin;
  const tcFlag = req.body.tcFlag;
  const isSorted = req.body.isSorted;
  var resultJSON = {};
  if (sizeMax > maxEle - minEle + 1 && isDistinct) {
    resultJSON.message = "Invalid Constraints. Please Check them Again!!";
  } else {
    resultJSON.message = "Success!";
    if (tcFlag) {
      resultJSON.tcFlag = tcFlag;
      resultJSON.numTestCases = numTestCases;
    }
    var arrayOfObjects = [];
    for (var i = 0; i < numTestCases; i++) {
      var jsonOfArray = {};
      var sizeOfArray = randomNumberInt(sizeMin, sizeMax);
      jsonOfArray.size = sizeOfArray;
      if (isInt) {
        var a = [];
        for (var j = 0; j < sizeOfArray; j++) {
          var num = randomNumberInt(minEle, maxEle);
          if (isDistinct) {
            while (a.includes(num)) {
              num = randomNumberInt(minEle, maxEle);
            }
          }
          a.push(Number(num));
        }
      } else {
        var a = [];
        for (var j = 0; j < sizeOfArray; j++) {
          var num = randomNumber(minEle, maxEle);
          if (isDistinct) {
            while (a.includes(num)) {
              num = randomNumber(minEle, maxEle);
            }
          }
          a.push(Number(num));
        }
      }
      if (isSorted) {
        a = a.sort(function (x, y) {
          return x - y;
        });
      }
      jsonOfArray.array = a;
      console.log(jsonOfArray);
      arrayOfObjects.push(jsonOfArray);
    }
    resultJSON.array = arrayOfObjects;
  }
  res.json(resultJSON);
});

router.post("/random/characters", (req, res) => {
  const isDistinct = req.body.isDistinct;
  const maxEle = req.body.maxEle.charCodeAt(0);
  const minEle = req.body.minEle.charCodeAt(0);
  const numTestCases = req.body.numTestCases;
  const tcFlag = req.body.tcFlag;
  const isSorted = req.body.isSorted;
  var resultJSON = {};
  if (maxEle - minEle + 1 < numTestCases && isDistinct) {
    resultJSON.message = "Invalid Constraints. Please Check them Again!!";
  } else {
    resultJSON.message = "Success!";
    if (tcFlag) {
      resultJSON.tcFlag = tcFlag;
      resultJSON.numTestCases = numTestCases;
    }
    var a = [];
    for (var i = 0; i < numTestCases; i++) {
      var num = randomNumberInt(minEle, maxEle);
      if (isDistinct) {
        while (a.includes(num)) {
          num = randomNumberInt(minEle, maxEle);
        }
      }
      a.push(String.fromCharCode(num));
    }
    resultJSON.array = a;
  }
  res.json(resultJSON);
});

router.post("/random/strings", (req, res) => {
  const sizeMax = req.body.sizeMax;
  const sizeMin = req.body.sizeMin;
  const sizeFlag = req.body.sizeFlag;
  const isDistinct = req.body.isDistinct;
  const maxEle = req.body.maxEle.charCodeAt(0);
  const minEle = req.body.minEle.charCodeAt(0);
  const numTestCases = req.body.numTestCases;
  const tcFlag = req.body.tcFlag;
  const isSorted = req.body.isSorted;
  var resultJSON = {};
  if (sizeMax > maxEle - minEle + 1 && isDistinct) {
    resultJSON.message = "Invalid Constraints. Please Check them Again!!";
  } else {
    resultJSON.message = "Success!";
    if (tcFlag) {
      resultJSON.tcFlag = tcFlag;
      resultJSON.numTestCases = numTestCases;
    }
    var arrayOfObjects = [];
    for (var i = 0; i < numTestCases; i++) {
      var s = "";
      var jsonOfString = {};
      var size = randomNumberInt(sizeMin, sizeMax);
      if (sizeFlag) {
        jsonOfString.size = size;
      }
      for (var j = 0; j < size; j++) {
        var num = randomNumberInt(minEle, maxEle);
        if (isDistinct) {
          while (s.includes(num)) {
            num = randomNumberInt(minEle, maxEle);
          }
        }
        s += String.fromCharCode(num);
      }
      if (isSorted) {
        s = s.split("").sort().join("");
      }
      jsonOfString.string = s;
      arrayOfObjects.push(jsonOfString);
    }
    resultJSON.strings = arrayOfObjects;
  }

  res.json(resultJSON);
});

router.post("/random/numberMatrices", (req, res) => {
  const rowMin = req.body.rowMin;
  const rowMax = req.body.rowMax;
  const colMin = req.body.colMin;
  const colMax = req.body.colMax;
  const isInt = req.body.isInt;
  const isDistinct = req.body.isDistinct;
  const maxEle = req.body.maxEle;
  const minEle = req.body.minEle;
  const numTestCases = req.body.numTestCases;
  const tcFlag = req.body.tcFlag;
  var resultJSON = {};
  if (colMax * rowMax > maxEle - minEle + 1 && isDistinct) {
    resultJSON.message = "Invalid Constraints. Please Check them Again!!";
  } else {
    resultJSON.message = "Success!";
    if (tcFlag) {
      resultJSON.tcFlag = tcFlag;
      resultJSON.numTestCases = numTestCases;
    }
    var arrayOfObjects = [];
    for (var i = 0; i < numTestCases; i++) {
      var jsonOfMatrix = {};
      var row = randomNumberInt(rowMin, rowMax);
      var col = randomNumberInt(colMin, colMax);
      jsonOfMatrix.rowSize = row;
      jsonOfMatrix.colSize = col;
      var a = [];
      if (isInt) {
        for (var j = 0; j < row; j++) {
          var b = [];
          for (var k = 0; k < col; k++) {
            var num = randomNumberInt(minEle, maxEle);
            if (isDistinct) {
              while (b.includes(num)) {
                num = randomNumberInt(minEle, maxEle);
              }
            }
            b.push(num);
          }
          a.push(b);
        }
      } else {
        for (var j = 0; j < row; j++) {
          var b = [];
          for (var k = 0; k < col; k++) {
            var num = randomNumber(minEle, maxEle);
            if (isDistinct) {
              while (b.includes(num)) {
                num = randomNumber(minEle, maxEle);
              }
            }
            b.push(num);
          }
          a.push(b);
        }
      }
      jsonOfMatrix.matrix = a;
      arrayOfObjects.push(jsonOfMatrix);
    }
    resultJSON.matrices = arrayOfObjects;
  }

  res.json(resultJSON);
});

router.post("/random/charMatrices", (req, res) => {
  const rowMin = req.body.rowMin;
  const rowMax = req.body.rowMax;
  const colMin = req.body.colMin;
  const colMax = req.body.colMax;
  const hasSpace = req.body.hasSpace;
  const isDistinct = req.body.isDistinct;
  const maxEle = req.body.maxEle.charCodeAt(0);
  const minEle = req.body.minEle.charCodeAt(0);
  const numTestCases = req.body.numTestCases;
  const tcFlag = req.body.tcFlag;
  var resultJSON = {};
  if (colMax * rowMax > maxEle - minEle + 1 && isDistinct) {
    resultJSON.message = "Invalid Constraints. Please Check them Again!!";
  } else {
    resultJSON.message = "Success!";
    if (tcFlag) {
      resultJSON.tcFlag = tcFlag;
      resultJSON.numTestCases = numTestCases;
    }
    resultJSON.hasSpace = hasSpace;
    var arrayOfCharMatrices = [];
    for (var i = 0; i < numTestCases; i++) {
      var jsonOfMatrix = {};
      var row = randomNumberInt(rowMin, rowMax);
      var col = randomNumberInt(colMin, colMax);
      jsonOfMatrix.rowSize = row;
      jsonOfMatrix.colSize = col;
      var a = [];
      for (var j = 0; j < row; j++) {
        var b = [];
        for (var k = 0; k < col; k++) {
          var num = randomNumberInt(minEle, maxEle);
          if (isDistinct) {
            while (b.includes(num)) {
              num = randomNumberInt(minEle, maxEle);
            }
          }
          b.push(String.fromCharCode(num));
        }
        if (hasSpace) {
          a.push(b);
        } else {
          a.push(b.join(""));
        }
      }
      jsonOfMatrix.matrix = a;
      arrayOfCharMatrices.push(jsonOfMatrix);
    }
    resultJSON.matrices = arrayOfCharMatrices;
  }
  res.json(resultJSON);
});

router.post("/random/charMatricesFromSet", (req, res) => {
	const rowMin = req.body.rowMin;
	const rowMax = req.body.rowMax;
	const colMin = req.body.colMin;
	const colMax = req.body.colMax;
	const hasSpace = req.body.hasSpace;
	const isDistinct = req.body.isDistinct;
	const charSet=req.body.charSet.split(" ");
	const numTestCases = req.body.numTestCases;
	const tcFlag = req.body.tcFlag;
	var resultJSON = {};
	if (colMax * rowMax > charSet.length && isDistinct) {
	  resultJSON.message = "Invalid Constraints. Please Check them Again!!";
	} else {
	  resultJSON.message = "Success!";
	  if (tcFlag) {
		resultJSON.tcFlag = tcFlag;
		resultJSON.numTestCases = numTestCases;
	  }
	  resultJSON.hasSpace = hasSpace;
	  var arrayOfCharMatrices = [];
	  for (var i = 0; i < numTestCases; i++) {
		var jsonOfMatrix = {};
		var row = randomNumberInt(rowMin, rowMax);
		var col = randomNumberInt(colMin, colMax);
		jsonOfMatrix.rowSize = row;
		jsonOfMatrix.colSize = col;
		var a = [];
		for (var j = 0; j < row; j++) {
		  var b = [];
		  for (var k = 0; k < col; k++) {
			var num = charSet[randomNumberInt(0, charSet.length-1)];
			if (isDistinct) {
			  while (b.includes(num)) {
				num = charSet[randomNumberInt(0, charSet.length-1)];
			  }
			}
			b.push(num);
		  }
		  if (hasSpace) {
			a.push(b);
		  } else {
			a.push(b.join(""));
		  }
		}
		jsonOfMatrix.matrix = a;
		arrayOfCharMatrices.push(jsonOfMatrix);
	  }
	  resultJSON.matrices = arrayOfCharMatrices;
	}
	res.json(resultJSON);
  });


module.exports = router;

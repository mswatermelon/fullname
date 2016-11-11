const app = require('express')();
const bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let checkOnlyCharacters = (...items)=>{
  let check = true;
  console.log('До '+check);
  for(let i of items){
    console.log('---');
    console.log(i);
    console.log(/^[0-9]+$/.test(i));
    console.log('---');
    if (/^[0-9]+$/.test(i)) check &= false;
  }

  console.log('После '+check);
  return check;
}

app.get('/', function(req, res) {
  let fullname = req.query.fullname;

  if (!fullname) res.send('Invalid fullname');
  else {
    let fullArr = fullname.split(' ');
    console.log(checkOnlyCharacters(...fullArr));
    if (checkOnlyCharacters(...fullArr)){
      // console.log(fullArr);
      if (fullArr.length==3){
        res.send(`${fullArr[2]} ${fullArr[0][0]}. ${fullArr[1][0]}.`);
      }
      else if (fullArr.length==2){
        res.send(`${fullArr[1]} ${fullArr[0][0]}.`);
      }
      else if (fullArr.length==1){
        res.send(`${fullArr[0]}`);
      }
      else {
        res.send('Invalid fullname');
      }
    }
    else res.send('Invalid fullname');
  }
})

app.listen(1337);

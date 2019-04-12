const express = require('express');
const app = express();
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');

const indexRouter = require('./routes/index');
const reviewRouter = require('./routes/review');
const channelsRouter = require('./routes/channels');
const usersRouter = require('./routes/users');

const hbars = exphbs.create({
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/layouts/',

  helpers: {
    foo: function(){
      return 'foo'
    },
    paginate: function(arr, option){
      //console.log(arr);
      if (arr.length > option) {
        
        let slides = Math.ceil(arr.length / option);
        let output = '<ul id="pages">'
           // create pagination nav
           for (let n = 0; n < slides; n++) {
            output = output + '<li data-page="' + n + '">' + (n + 1) + '</li>';
          }
        
          output = output +  '</ul><div id="paginated">';

        // loop articles and format
        let s = 0;
        while (s < slides) {
          
          let newArr = arr.splice(0, option);

          output = output + '<section>';
          
          for (let i = 0; i < newArr.length; i++) {
            output = output + '<article class="review"><h2>' + newArr[i].ratingTitle + 
                              '</h2><span>By ' + newArr[i].ratingBy + 
                              '</span>' + newArr[i].ratingContent + 
                              '</article>';  
          }
          
          output = output + '</section>';
          s++;
        }

        output = output + '</div>';

        return output;

      } else {
        let output = "<section>";
        
        for (let i = 0; i < arr.length; i++) {
          output = output + '<article class="review"><h2>' + arr[i].ratingTitle + 
                            '</h2><span>By ' + arr[i].ratingBy + 
                            '</span>' + arr[i].ratingContent + 
                            '</article>';  
        }

        return output + '</section>';
      }

    } // end paginate



  }// end helpers


});

// view engine setup
app.engine('hbs', hbars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/review', reviewRouter);
app.use('/channels', channelsRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

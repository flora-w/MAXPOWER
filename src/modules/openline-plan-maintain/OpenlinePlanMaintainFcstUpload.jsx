import React from 'react';
import { connect } from 'react-redux';
import Row from 'antd/es/row';
import message from 'antd/es/message';
import { makeStyles } from '@material-ui/styles';
import * as REDUCERS from 'constants/reducerNames';
import * as ACTIONS from 'constants/actionTypes';

const useStyles = makeStyles({
  root: {
    margin: '10px 0',
  },
  monthchoose:{
    margin:'0 10px',
  },
  input:{
    margin:'0 10px',
    width:600,
    height:25,
  },
  span:{
    padding:'0 5px 0 5px',
  },
  button:{
    height:25,
    margin:'0 10px',
  },
  upload:{
    margin: '20px 0',
  }
});

function OpenlinePlanMaintainFcstUpload({ uploadOpenlinePlanMaintainFcst }) {
    const classes = useStyles();
    function handleOnUpload({ target }) {
        const { files } = target;
        if (files.length === 0) {
          return;
        }
        else{
            const filetype = files[0].name.substr(files[0].name.indexOf("."),(files[0].name.length-files[0].name.indexOf(".")));
            console.log(filetype.toLowerCase())
            if(filetype.toLowerCase() === ".xlsx")
            {
                console.log(files[0])
                uploadOpenlinePlanMaintainFcst({
                    file: files[0]
                });
                var obj = document.getElementById("file") ; 
                obj.outerHTML=obj.outerHTML;
            }
            else{
                message.error(
                '文件格式不正確.',
                );
            }
        }
    }
    return (
        <Row className={classes.upload}>
            <input
                className={classes.input}
                type="file"
                id="file" 
                accept=".xlsx"
                multiple={false}
                onChange={handleOnUpload}
            />
        </Row>      
    );
}

const uploadOpenlinePlanMaintainFcstAction= (data) =>({
  type: ACTIONS.UPLOAD_OPENLINE_PLAN_MAINTAIN_FCST,
  target: REDUCERS.OPENLINE_PLAN_MAINTAIN,
  data
})

const mapStateToProps = state => ({
  ...state.OpenlinePlanMaintain,
});

const mapDispatchToProps = dispatch => ({
  uploadOpenlinePlanMaintainFcst:(data) => dispatch(uploadOpenlinePlanMaintainFcstAction(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(OpenlinePlanMaintainFcstUpload);
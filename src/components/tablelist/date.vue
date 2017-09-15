<template>
<div>
	<!-- <div>
		 <el-date-picker
	      v-model="value1"
	      :type="timetype == 'OBJ_DATE'?'datetime':'date'"
	      placeholder="选择开始日期"
	     
	     >
	    </el-date-picker>
	</div>
	<div>
	<el-date-picker
	      v-model="value2"
	      :type="timetype == 'OBJ_DATE'?'datetime':'date'"
	      placeholder="选择结束日期"
	    
	      >
	    </el-date-picker>
	</div> -->


	<el-date-picker
      v-model="value7"
      :type="timetype == 'OBJ_DATE'?'datetimerange':'daterange'"
      align="right"
      :format="timetype == 'OBJ_DATE'?'yyyy/MM/dd HH:mm:ss':'yyyy/MM/dd'"
      placeholder="选择日期范围"
      :picker-options="pickerOptions2">
    </el-date-picker>
	
</div> 
</template>

<script type="less">
    export default {
    props: {
    		date: {     //id
    			// type: Object   //通过传递对象，在子组建可以同时改变父组件的值
    		},
    		timetype:{

    		}
    		
    	},
    data() {
      return {
        	value7:'',
    		pickerOptions2: {
	          shortcuts: [{
	            text: '最近一周',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', [start, end]);
	            }
	          }, {
	            text: '最近一个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	              picker.$emit('pick', [start, end]);
	            }
	          }, {
	            text: '最近三个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
	              picker.$emit('pick', [start, end]);
	            }
	          }]
	        }
      };
    },
    methods:{
		// packDate0(date){
		// 	var _self = this
	 //  //   	console.log(this.pickerOptions0.disabledDate(_self.value1))

	  	
	    	
	 //    },
	    timeclick(num,timetype){
	    	var _self = this
	    	var time = new Date()
	    	var oldtime = new Date(time.getTime() - 24*3600*1000*Number(num))
	    
	    	return _self.datachange(oldtime,timetype,num)
	   
	    },
	    datachange(time,timetype,num){
	    	var time = new Date(time)
			var year = time.getFullYear();
			var month = time.getMonth();
			var day = time.getDate();
			var hours = time.getHours();
			var min = time.getMinutes();
			var sec = time.getSeconds();
			month = Number(month) + 1;
			month = month>9?month:'0'+month;
			day = day>9?day:'0'+day;
			hours = hours>9?hours:'0'+hours;
			min = min>9?min:'0'+min;
			sec = sec>9?sec:'0'+sec;
			if(timetype == 'OBJ_DATENUMBER'){
				return year+'-'+month+'-'+day
			}else{
				if(num != 0){
					return year+'-'+month+'-'+day+' '+'00'+':'+'00'+':'+'00'
				}else{
					return year+'-'+month+'-'+day+' '+hours+':'+min+':'+sec
				}
				
			}
			
		}
    },
    mounted(){
    	let _self = this
    	_self.value2 = _self.timeclick(0,_self.timetype)
    	_self.value1 = _self.timeclick(_self.date,_self.timetype)

    
    }
  };
</script>

<style rel="stylesheet">
    input[type=text]{
    	border-radius: 0px;
    }
	
    .lastdate{
    	margin-top: 1px;
    	input{
    		
    	}
    }
</style>

/*
* @Author: brooke
* @Date:   2018-10-29 18:26:02
* @Last Modified by:   brooke
* @Last Modified time: 2018-10-31 19:54:41
*/
var modules = [
    'text!../views/account-setting.html'
];

define(modules, function(accountSetting)
{
    return {
        name: 'accountSetting',
        template: accountSetting,
        props: ['settingModal', 'tanShow'],
        watch:{
        	settingModal: function(state){
        		this.dialogFormVisible = state;
        	},
        	dialogFormVisible: function(state){
        		this.tanShow(state);
        	}
        },
        data: function(){
            return {
            	model:{
	 				password:''
	 			},
	 			formLabelWidth: '100px',
	            dialogFormVisible: false,
	            rules: {
		          	password: [
		            	{ required: true, message: '请输入登录密码', trigger: 'blur' },
		            	{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
		          	]
	          	}
            }
        },
        methods:{
	     	dialogBtn: function(){
	     		this.dialogFormVisible = false;
	     	},
	     	update: function(){
	     		var that = this;

                this.$refs.addForm.validate(function(valid){
                    if (valid) {
                        that.$emit('on-success-valid', {
                            password: that.model.password
                        });
                    }
                });
	     	}
      	},
      	created: function(){
      		var that = this;

      		this.$on('handleSubmit', function(result){
      			result.then(function(res){
                    that.$message.success('修改成功');
                    that.$refs.addForm.resetFields();
                    that.dialogBtn();
                }).catch(function(msg){
                    that.$message.error(msg);
                })
      		});
      	}
    }
})
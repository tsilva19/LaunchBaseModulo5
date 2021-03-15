const { age, date } = require("../../lib/utils")
const Member = require('../models/Member')

module.exports = {
    index(req, res){
        Member.all(function(members) {
            return res.render("members/index", { members })
        })
       
    },
    post(req, res){
    
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            // req.body.key == ""
            if(req.body[key] == "") {
                return res.send('Please, fill a filld')
            }
            
        }

        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })
    },

   show(req, res){
       Member.find(req.params.id, function(member){
           if(!member) return res.send("Member not Found")

           member.birth = date(member.birth).birthDay
           

           return res.render("members/show", { member })
       } )


    },
    create(req, res){

        Member.instructorsSelectOptions(function(options) {
            if(!options) return res.send("Member not Found")
            return res.render("members/create", { instructorOptions: options}) 
        })

        
    },
    edit(req, res){
      Member.find(req.params.id, function(member){
           if(!member) return res.send("Member not Found")

           member.birth = date(member.birth).iso

           Member.instructorsSelectOptions(function(options) {
            if(!options) return res.send("Member not Found")
            return res.render("members/edit", {member, instructorOptions: options}) 
        })
          
       } )
 
 
    },
    put(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            // req.body.key == ""
            if(req.body[key] == "") {
                return res.send('Please, fill a filld')
            }
            
        }
       

       Member.update(req.body, function(){
           return res.redirect(`/members/${req.body.id}`)
       })
    },
    delete(req, res){
        Member.delete(req.body.id, function(){
            return res.redirect(`/members`)
        })
    },

}



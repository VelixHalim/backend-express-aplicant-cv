const {Response} = require('../models/CommonModel')
const CommonFunction = require('../function/CommonFunction');
const { default: axios } = require('axios');
const { response } = require('express');


class CVDatasource{
    constructor({cvPGDB}){
        this.cvPGDB = cvPGDB
    }

    async getAllDataCV(){
        let sql =`
            select * from "Pelamar"
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoQuery(this.cvPGDB,sql,{})
        console.log(Ostatus,Oresult)
        if(Ostatus == 1){
            return Response(553,"Terjadi kesalahan pada data pelamar",null);
        } 
        if(Ometadata.rowCount==0) {
            return Response(553,"Data tidak ditemukan",null);
        }
        return Response("0","Berhasil",Oresult)
    }

    async postDataCV(nama_lengkap,nomortelepon,email,linkedin,gender,alamat,summary,education,experience){
        console.log("post data")
        let id=Date.now().toString()
        console.log(id)
        // console.log(id, nama_lengkap)
        const t = await this.cvPGDB.sequelize.transaction();
        let sql =`
            insert into "Pelamar" (id, nama_lengkap,summary, nomortelepon,email, gender, alamat, linkedin, createddate, updateddate)
            values ('${id}', '${nama_lengkap}',' ${summary}',' ${nomortelepon}', '${email}',' ${gender}',' ${alamat}', '${linkedin}',current_timestamp, current_timestamp)
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.cvPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data pelamar",null);
        } 
        if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }
        console.log(Oresult)

        let sqledu =`
            insert into "Education" (idpelamar, degree,gpa,tempat_pendidikan,jurusan,createddate, updateddate)
            values
        `
        const jmledu = education.length
        education.map((data,index)=>{
            if(jmledu-1!==index){
                sqledu+=`('${id}', '${data.degree}','${data.GPA}','${data.institusi}','${data.major}',current_timestamp,current_timestamp),`
            }else{
                sqledu+=`('${id}', '${data.degree}','${data.GPA}','${data.institusi}','${data.major}',current_timestamp,current_timestamp)`
            }
        })

        const [Estatus, Eresult, Emetadata] = await CommonFunction.DoTransactionQueryNonArray(this.cvPGDB,sqledu,{},t)
        if(Estatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data edukasi",null);
        } else if(Emetadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }
        console.log(Eresult)

        let sqlexp =`
            insert into "Experience" (idpelamar, job,detail,createddate, updateddate)
            values
        `
        const jmlexp = education.length
        experience.map((data,index)=>{
            if(jmlexp-1!==index){
                sqlexp+=`('${id}', '${data.Job}','${data.details}',current_timestamp,current_timestamp),`
            }else{
                sqlexp+=`('${id}', '${data.Job}','${data.details}',current_timestamp,current_timestamp)`
            }
        })

        const [Xstatus, Xresult, Xmetadata] = await CommonFunction.DoTransactionQueryNonArray(this.cvPGDB,sqlexp,{},t)
        console.log(Xresult)
        if(Xstatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data experience",null);
        } else if(Xmetadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil Menginput Data",Xresult)
        }
    }
    async getDetailDataCV(id){
        let sqledu = `
            select * from "Education" where idpelamar ='${id}'
        `
        const [Estatus, Eresult, Emetadata] = await CommonFunction.DoQuery(this.cvPGDB,sqledu,{})
        if(Estatus==1){
            return Response(553,"Terjadi kesalahan pada data education",null);
        }else if(Emetadata==0){
            return Response(553,"Data tidak ditemukan",null);
        }
        let sqlexp = `
            select * from "Experience" where idpelamar ='${id}'
        `
        const [Xstatus, Xresult, Xmetadata] = await CommonFunction.DoQuery(this.cvPGDB,sqlexp,{})
        if(Xstatus==1){
            return Response(553,"Terjadi kesalahan pada data experience",null);
        }else if(Xmetadata==0){
            return Response(553,"Data tidak ditemukan",null);
        }else{
            const result = {
                education:Eresult,
                experience:Xresult
            }
            return Response("0","Berhasil",result)
        }
    }
    async deleteDataCV (id){
        const t = await this.cvPGDB.sequelize.transaction();
        let sql=`
            delete from "Pelamar" where id='${id}'
        `
        const [Pstatus, Presult, Pmetadata] = await CommonFunction.DoTransactionQueryNonArray(this.cvPGDB,sql,{})
        if(Pstatus==1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data pelamar",null);
        }else if(Pmetadata==0){
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }
        let sqledu=`
            delete from "Education" where idpelamar='${id}'
        `
        const [Estatus, Eresult, Emetadata] = await CommonFunction.DoTransactionQueryNonArray(this.cvPGDB,sqledu,{})
        if(Estatus==1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data education",null);
        }else if(Emetadata==0){
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }
        let sqlexp=`
            delete from "Experience" where idpelamar='${id}'
        `
        const [Xstatus, Xresult, Xmetadata] = await CommonFunction.DoTransactionQueryNonArray(this.cvPGDB,sqlexp,{})
        if(Xstatus==1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data experience",null);
        }else if(Xmetadata==0){
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","berhasil menghapus data",Xresult)
        }        
    }
}

module.exports = CVDatasource

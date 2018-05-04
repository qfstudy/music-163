{
    let view={
        el: '#songList-container',
        template: `
            <ul class="songList">
                
            </ul>
        `,
        render(data){
            let $el=$(this.el)
            $el.html(this.template)
            let{songs}=data
            // console.log('----++++')
            // console.log(data)
            let liList=songs.map((song)=>{
                // console.log('----')
                // console.log(song.id.id)
                return $('<li></li>').text(song.name).attr('data-song-id' , song.id.id)//song.id.id
            }
            )
            $el.find('ul').empty()
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        },
        activeItem(li){
            let $li=$(li)
            $li.addClass('active')
                .siblings('.active').removeClass('active')
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model={
        data:{
            songs:[ ]
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs=songs.map((song)=>{
                    // console.log(song.id)
                    return{id:song,...song.attributes}
                })
                return songs
            })
        }
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventHub()
            this.getAllSongs()
        },
        getAllSongs(){
            return this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            $(this.view.el).on('click','li',(e)=>{
                this.view.activeItem(e.currentTarget)
                let songId=e.currentTarget.getAttribute('data-song-id')
                // let name=e.currentTarget.textContent
                let data
                let songs=this.model.data.songs
                for(let i=0;i<songs.length;i++){
                    if(songs[i].id.id===songId){
                        data=songs[i]
                        break
                    }
                }
               let object=JSON.parse(JSON.stringify(data))
                window.eventHub.emit('select',object)
            })
        },
        bindEventHub(){
            window.eventHub.on('upload',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('create',(songData)=>{
                this.model.data.songs.push(songData)
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',()=>{
                this.view.clearActive()
            })
        }
    }
    controller.init(view,model)
}
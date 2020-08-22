let counter = 1, mouseDown,x=0,y=0,transformX, moved;
const $ = elem => document.querySelectorAll(elem)
const carouselParent = $('.carousel')[0]
const carouselDotsParent = $('.dots')[0]
const carousel = $('.carousel-inner')[0]
const carouselSlides = $('.carousel-inner img')
const elemWidth = carousel.clientWidth
carouselSlides.forEach((item, i) => {
  item.addEventListener('dragstart',e=>{e.preventDefault()})
  if(i !== 0 && i !== carouselSlides.length-1) {
    let styleClasses = ["dot"]
    if(i === 1) styleClasses.push("active-slide")
    carouselDotsParent.innerHTML+= `
      <span class=\"${styleClasses.join(' ')}\" onclick=\"gotoSlide(${i})\"></span>
    `
  }
})
const carouselDots = $('.dots .dot')

carousel.style.transform = `translateX(${-elemWidth * counter}px)`
const next = () =>{
  if(counter >= carouselSlides.length-1) return
  counter++ && transform({transition:true})
}
const prev = () =>{
  if(counter <= 0) return
  counter-- && transform({transition:true})
}
const outEvent = () =>{
  if(mouseDown){
    transformX = +carousel.style.transform.replace(/(translateX|px|\(|\))/gi,'')
    if(moved > elemWidth/2.8){
      counter++
      return transform({transition:true})
    }
    if(moved < -elemWidth/2.8){
      counter--
      return transform({transition:true})
    }
    transformX % elemWidth === 0 || transform({transition:true})
    x = 0
    mouseDown = false
  }
}
const gotoSlide = slideId => {
  counter = slideId
  transform({transition:true})
}
carousel.addEventListener('mousedown',(e)=>{
  moved = 0
  transformX = +carousel.style.transform.replace(/(translateX|px|\(|\))/gi,'')
  const { pageX, pageY } = e
  !([x,y] = [pageX, pageY])
  mouseDown = true
})
carouselParent.addEventListener('mouseup',(e)=>{
  outEvent()
})
carouselParent.addEventListener('mouseout',(e)=>{
  outEvent()
})
carousel.addEventListener('mousemove',(e)=>{
  if(mouseDown){
    const {clientX} = e
    // console.log({x,clientX,"x - clientX":x - clientX,"clientX - x": clientX-x})
    moved = (x - clientX)
    if(moved){
      const displacementX = transformX - moved
      carousel.style.transition = "none"
      carousel.style.transform = `translateX(${displacementX}px)`
    }
  }
})
const transform = ({transition}) => {
  mouseDown = false
  carousel.style.transition = transition ? `all .3s linear` : 'none'
  carousel.style.transform = `translateX(${-elemWidth * counter}px)`
  // console.log(counter)
  if(counter !== 0 && counter !== carouselSlides.length-1){
    const navType = -elemWidth * counter > transformX ? "prev" : "next"
    $('.active-slide')[0].className = "dot"
    carouselDots[counter-1].className = `active-slide dot ${navType}`
  }
  transformX = -elemWidth * counter
}
carousel.addEventListener('transitionend',(e)=>{
  if(carouselSlides[counter].id){
    const {id} = carouselSlides[counter]
    if(id === "last") counter = carouselSlides.length-2
    if(id === "first") counter = 1
    transform({transition:false})
  }
})

// jsx文件写样式需要从外部引入样式文件
import '../assets/styles/footer.styl'

// jsx文件是将html写在js文件中的
// 而vue文件是将js写在html文件中
export default {
  data () {
    return {
      author: 'Guo'
    }
  },
  render () {
    return (
      <div class="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}

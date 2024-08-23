import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost: Post[] = [];
  post: Post = new Post();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.findPosts();
  }

  findPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.listPost = data;
    }, error => {
      console.error('Erro ao buscar posts:', error);
    });
  }

  sendPost() {
    this.postService.postPosts(this.post).subscribe(
      (data: Post) => {
        this.listPost.push(data);
        this.post = new Post();
      },
      error => {
        console.error('Erro ao publicar post:', error);
      }
    );
  }
}

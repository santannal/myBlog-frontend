import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost: Post[] = [];
  filteredPosts: Post[] = [];
  post: Post = new Post();
  searchTerm: string = '';
  formGroupFeed: FormGroup;

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
    this.formGroupFeed = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.findPosts();
  }

  findPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.listPost = data;
      this.filteredPosts = data;
    }, error => {
      console.error('Erro ao buscar posts:', error);
    });
  }

  sendPost() {
    if (this.formGroupFeed.valid) {
      this.postService.postPosts(this.post).subscribe(
        (data: Post) => {
          // this.listPost.push(data);
          this.filteredPosts.push(data);
          this.post = new Post();
          this.formGroupFeed.markAsUntouched();
          this.formGroupFeed.markAsPristine();
        },
        error => {
          console.error('Erro ao publicar post:', error);
        }
      );
    }
  }

  //deixar um input como tocado, ao clicarem
  markFieldAsTouched(field: string) {
    this.formGroupFeed.get(field)?.markAsTouched();
  }

  filterComments() {
    if (this.searchTerm.trim() === '') {
      this.filteredPosts = this.listPost;
    } else {
      this.filteredPosts = this.listPost.filter(post =>
        post.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  get efgName() { return this.formGroupFeed.get("name") }
  get efgEmail() { return this.formGroupFeed.get("email") }
  get efgMessage() { return this.formGroupFeed.get("message") }
}

import { Component, Input } from '@angular/core';
import { CommentService } from 'src/app/service/Article/comment.service';

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css'],
})
export class SentimentAnalysisComponent {
  @Input() comment?: string;
  commentAnalysis: any;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    if (this.comment) {
      this.analyzeSentiment(this.comment);
    }
  }

  analyzeSentiment(comment: string): void {
    const dataComment = {
      comment: comment,
    };
    this.commentService.sentimentAnalysis(dataComment).subscribe(
      (result: any) => {
        // Modifier le type de result en string
        console.log('Sentiment Analysis Result:', result.comment);
        this.commentAnalysis = result.comment;
      },
      (error) => {
        console.error('Error performing sentiment analysis:', error);
      }
    );
  }
}

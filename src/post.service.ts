import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findUniquePost(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async deletePost(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async createPostUserMapping(postId: string, userId: string): Promise<void> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if(!post ){
      throw new Error('Post not found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if(!user ){
      throw new Error('User not found');
    }

    await this.prisma.userPostMapping.create({
      data: {
        postId,
        userId,
      },
    });
  }

  async createPostTagMapping(postId: string, tagId: string): Promise<void> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if(!post ){
      throw new Error('Post not found');
    }

    const tag = await this.prisma.tag.findUnique({
      where: {
        id: tagId,
      },
    });
    if(!tag ){
      throw new Error('Tag not found');
    }

    await this.prisma.postTagMapping.create({
      data: {
        postId,
        tagId,
      },
    });
  }
}

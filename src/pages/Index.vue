<template>
  <Layout>
    <!-- Page Header -->
    <header
      class="masthead"
      :style="{
        backgroundImage: `url('${
          general.cover
            ? GRIDSOME_API_URL + general.cover.url
            : '/img/home-bg.jpg'
        }')`
      }"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{ general.title }}</h1>
              <span class="subheading">{{ general.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div
            v-for="edge in $page.posts.edges"
            :key="edge.node.id"
            class="post-preview"
          >
            <g-link :to="'/post/' + edge.node.id">
              <h2 class="post-title">{{ edge.node.title }}</h2>
              <!-- <h3 class="post-subtitle">
                Problems look mighty small from 150 miles up
              </h3> -->
            </g-link>
            <p class="post-meta">
              Posted by
              <a href="#">
                {{
                  edge.node.created_by.firstname + edge.node.created_by.lastname
                }}
              </a>
              on {{ edge.node.created_at | date }}
            </p>
            <p>
              <span v-for="tag in edge.node.tags" :key="tag.id">
                <g-link :to="`/tag/${tag.id}`">{{ tag.title }}</g-link>
                &nbsp;
              </span>
            </p>
            <hr />
          </div>
          <!-- Pager -->
          <Pager :info="$page.posts.pageInfo" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query($page: Int) {
  posts: allStrapiPost(
    sortBy: "updated_at"
    order: DESC
    perPage: 5
    page: $page
  ) @paginate {
    pageInfo {
      totalPages
      currentPage
    }

    edges {
      node {
        id
        title
        created_by {
          id
          firstname
          lastname
        }
        created_at
        tags {
          id
          title
        }
      }
    }
  }

  general: allStrapiGeneral {
    edges {
      node {
        id
        title
        subtitle
        cover {
          url
        }
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome'
export default {
  name: 'HomePage',
  components: { Pager },
  metaInfo: {
    title: 'Hello, world!'
  },
  computed: {
    general() {
      return this.$page.general.edges[0].node
    }
  }
}
</script>

<style></style>
